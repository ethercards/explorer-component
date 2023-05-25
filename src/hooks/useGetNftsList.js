import { useEffect, useMemo, useState, useRef } from 'react';
import { Contract } from 'ethers';

import { getProvider, useZoom2Contract } from '../utils/contract';
import { getContract } from '../utils/contract';
import GalaxisRegistry from '../abi/GalaxisRegistry.json';
import ZoomAbi from '../abi/Zoom2.json';
import tokenABI from '../abi/TokenV3.json';
import { zoomFetchTokenUris } from '../utils/zoom2';
import { GALAXIS_REGISTRY } from '../abi/constants/addresses';

export const useGetNftsList = (chainId, contractAddres, address, rpcUrl) => {
  const [zoomContract, setZoomContract] = useState(null);
  const [nftList, setNftList] = useState(null);
  const [error, setError] = useState(null);
  const provider = useMemo(() => getProvider(rpcUrl), [rpcUrl]);

  const tokenContract = useMemo(() => {
    if (!contractAddres || !rpcUrl) {
      setError('No token contract or rpc');
      return null;
    }
    return new Contract(contractAddres, tokenABI.abi, provider);
  }, [contractAddres, provider, rpcUrl]);

  const fetchedRef = useRef(false);

  const createZoomContract = async () => {
    if (!provider) return;

    const galaxisRegistry = getContract(
      GALAXIS_REGISTRY,
      GalaxisRegistry.abi,
      provider,
      false
    );

    if (galaxisRegistry) {
      try {
        const zoomAddress = await galaxisRegistry.getRegistryAddress('ZOOM');
        let contract = getContract(zoomAddress, ZoomAbi.abi, provider, false);
        if (contract) {
          setZoomContract(contract);
        } else {
          const zoomAddress = useZoom2Contract(chainId);
          setZoomContract(zoomAddress);
        }
      } catch (error) {
        console.log('registry error', error);
      }
    }
  };

  const getNftList = async () => {
    setNftList(null);
    if (zoomContract && tokenContract && address) {
      try {
        const res = await zoomFetchTokenUris(
          tokenContract,
          zoomContract,
          address
        );
        setNftList(res);
        fetchedRef.current = true;
      } catch (error) {
        setError('Contract error');
        fetchedRef.current = true;
      }
    }
  };

  useEffect(() => {
    createZoomContract();
  }, [chainId, rpcUrl]);

  useEffect(() => {
    getNftList();
  }, [zoomContract, tokenContract, address]);

  return { nftList, error };
};
