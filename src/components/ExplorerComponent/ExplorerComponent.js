import React, { useEffect, useState } from 'react';
import ExplorerCards from './ExplorerCards';
import { useGetNftsList } from '../../hooks/useGetNftsList';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';

const ExplorerComponent = ({ tokenAddres, poolAddress, chainId }) => {
  const { nftList } = useGetNftsList(chainId, tokenAddres, poolAddress);
  const [traitTypes, setTraitTypes] = useState(null);
  useEffect(() => {
    const getTraitTypes = async () => {
      await axios
        .get('https://cms.galaxis.xyz/trait_types')
        .then((resp) => setTraitTypes(resp.data));
    };
    getTraitTypes();
  }, []);
  console.log(nftList, ' nft list');
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {nftList.length > 0 ? (
        <ExplorerCards nftList={nftList} traitTypes={traitTypes} />
      ) : (
        <SpinnerDotted color="#000" size={200} style={{ paddingTop: '30px' }} />
      )}
    </div>
  );
};

export default ExplorerComponent;
