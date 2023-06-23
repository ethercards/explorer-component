import React, { useEffect, useState, forwardRef } from 'react';
import ExplorerCards from './ExplorerCards';
import { useGetNftsList } from '../../hooks/useGetNftsList';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
import { ExpContext } from './ExpContext';

const ExplorerComponent = forwardRef((props, ref) => {
  const {
    tokenAddres,
    poolAddress,
    chainId,
    rpcUrl,
    serverUrl,
    selectedCardIds,
    updateSelectedIds,
    componentClass,
    disableLoading,
    setLoaded,
  } = props;

  if (disableLoading) return <p style={{ textAlign: 'center' }}>Empty pool</p>;

  if (!chainId || !tokenAddres || !poolAddress || !rpcUrl) {
    return;
  }
  const { nftList, error, loaded } = useGetNftsList(
    chainId,
    tokenAddres,
    poolAddress,
    rpcUrl
  );

  const [traitTypes, setTraitTypes] = useState(null);

  useEffect(() => {
    const getTraitTypes = async () => {
      try {
        const response = await axios.get(serverUrl + '/trait_types');
        setTraitTypes(response.data);
      } catch (error) {
        console.error('Error fetching trait types:', error);
      }
    };
    getTraitTypes();
  }, [serverUrl]);
  useEffect(() => {
    if (!setLoaded) return;
    setLoaded(loaded);
  }, [loaded]);

  return (
    <div ref={ref} style={{ height: '100%' }} className={componentClass}>
      <ExpContext.Provider value={props}>
        {nftList ? (
          nftList.length > 0 ? (
            <ExplorerCards
              nftList={nftList}
              traitTypes={traitTypes}
              tokenAddres={tokenAddres}
              serverUrl={serverUrl}
              updateSelectedIds={updateSelectedIds}
              selectedCardIds={selectedCardIds}
            />
          ) : (
            <p>Empty pool</p>
          )
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!error ? (
              <SpinnerDotted
                color="#000"
                size={200}
                style={{ paddingTop: '30px' }}
              />
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}
      </ExpContext.Provider>
    </div>
  );
});

export default ExplorerComponent;
