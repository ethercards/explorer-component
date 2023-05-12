import { useEffect, useMemo, useState } from 'react';
import { Contract } from 'ethers';

import { getProvider, useZoom2Contract } from '../utils/contract';
import config from '../config/config';
import { getContract } from '../utils/contract';
import GalaxisRegistry from '../abi/GalaxisRegistry.json';
import ZoomAbi from '../abi/Zoom2.json';
import tokenABI from '../abi/TokenV3.json';
import { zoomFetchTokenUris } from '../utils/zoom2';

export const useGetNftsList = (chainId, contractAddres, address) => {
  const [zoomContract, setZoomContract] = useState(null);
  const [nftList, setNftList] = useState([]);
  const provider = useMemo(() => {
    return getProvider(chainId);
  }, [chainId]); //provider
  const tokenContract = useMemo(
    () => new Contract(contractAddres, tokenABI.abi, provider),
    [contractAddres]
  );

  useEffect(async () => {
    if (provider) {
      const galaxisRegistry = getContract(
        config.GALAXIS_REGISTRY,
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
        }
      } else {
        zoomAddress = useZoom2Contract();
        setZoomContract(zoomAddress);
      }
    }
    //setting up the zoom contract;
  }, [chainId, provider]);

  useEffect(async () => {
    if (zoomContract && tokenContract && address) {
      await zoomFetchTokenUris(tokenContract, zoomContract, address)
        .then((res) => {
          setNftList(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [zoomContract, tokenContract, address]);

  return { nftList };
};
