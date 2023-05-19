import React, { useEffect, useState } from 'react';
import ExplorerCards from './ExplorerCards';
import { useGetNftsList } from '../../hooks/useGetNftsList';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';

const ExplorerComponent = ({
  tokenAddres,
  poolAddress,
  chainId,
  rpcUrl,
  openseaUrl,
  etherScanUrl,
  componentHeight,
  serverUrl,
  isAdmin,
  updateSelectedIds,
  selectedCardIds,
  showCardName,
  darkMode,
  etherscanUrl,
  columns,
}) => {
  const { nftList } = useGetNftsList(chainId, tokenAddres, poolAddress, rpcUrl);
  const [traitTypes, setTraitTypes] = useState(null);

  useEffect(() => {
    const getTraitTypes = async () => {
      await axios
        .get(serverUrl + '/trait_types')
        .then((resp) => setTraitTypes(resp.data));
    };
    getTraitTypes();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={`${darkMode && 'explorer-dark'}`}
    >
      {nftList ? (
        <>
          {nftList.length > 0 ? (
            <ExplorerCards
              nftList={nftList}
              traitTypes={traitTypes}
              tokenAddres={tokenAddres}
              openseaUrl={openseaUrl}
              etherScanUrl={etherScanUrl}
              componentHeight={componentHeight}
              serverUrl={serverUrl}
              isAdmin={isAdmin}
              updateSelectedIds={updateSelectedIds}
              selectedCardIds={selectedCardIds}
              showCardName={showCardName}
              etherscanUrl={etherscanUrl}
              columns={columns}
            />
          ) : (
            <p>Empty pool</p>
          )}
        </>
      ) : (
        <SpinnerDotted color="#000" size={200} style={{ paddingTop: '30px' }} />
      )}
    </div>
  );
};

export default ExplorerComponent;
