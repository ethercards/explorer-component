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
  const [nftList, setNftList] = useState([]);
  const provider = useMemo(() => {
    return getProvider(rpcUrl);
  }, [rpcUrl]); //provider
  const tokenContract = useMemo(
    () => new Contract(contractAddres, tokenABI.abi, provider),
    [contractAddres, provider]
  );
  const fetchedRef = useRef(false);

  const createZoomcontract = async () => {
    if (provider) {
      const galaxisRegistry = getContract(
        GALAXIS_REGISTRY,
        GalaxisRegistry.abi,
        provider,
        false
      );
      let zoomAddress;
      if (galaxisRegistry) {
        zoomAddress = await galaxisRegistry
          .getRegistryAddress('ZOOM')
          .catch((e) => {
            console.log('registry error', e);
          });
      }
      if (zoomAddress) {
        let contract = getContract(zoomAddress, ZoomAbi.abi, provider, false);
        if (contract) {
          setZoomContract(contract);
        } else {
          zoomAddress = useZoom2Contract(chainId);
          setZoomContract(zoomAddress);
        }
      }
    }
  }
  const getNftList = async () => {
    if (zoomContract && tokenContract && address) {
      await zoomFetchTokenUris(tokenContract, zoomContract, address)
        .then((res) => {
          setNftList(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  useEffect(() => {
    createZoomcontract();
  }, [chainId, rpcUrl]);

  useEffect(() => {
    if (fetchedRef.current === false) {
      getNftList();
      fetchedRef.current = true;
    }
  }, [zoomContract, tokenContract, fetchedRef.current, address]);

  return { nftList };
};
