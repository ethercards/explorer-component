import React, { useEffect, useState } from 'react';
import { GalaxisCard } from 'galaxis-components';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';

const GALAXIS_BASE_URL = 'https://cms.galaxis.xyz/';

const ExplorerCard = ({ meta, traitTypes, key, keyForChild }) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const metaURL = meta.tokenURI;
    const fetchMetadata = async () => {
      setLoading(true);
      await axios
        .get(metaURL)
        .then((resp) => setMetadata(resp.data))
        .catch((e) => console.log('error'));
      setLoading(false);
    };
    fetchMetadata();
  }, []);
  useEffect;

  const GetTraitImage = ({ traitType }) => {
    if (!traitType) return;
    const trait_type = traitTypes[traitType];
    return (
      <img
        className="explorer-simple-card-trait"
        src={GALAXIS_BASE_URL + trait_type.icon_white}
      />
    );
    // GALAXIS_BASE_URL + traitType.icon_white;
  };

  const Card = () => {
    return (
      <div className="explorer-simple-card">
        <img src={metadata.image} style={{ maxWidth: '100%' }} />
        <div className="explorer-simple-card-trait-container">
          <div className="explorer-simple-card-token-name">{metadata.name}</div>
          {/* <div>{metadata.tokenId}</div> */}
          <div className="explorer-simple-card-traits">
            {metadata.traits &&
              metadata.traits.length > 0 &&
              metadata.traits.map((trait) => {
                return trait.icon_url ? (
                  <img
                    className="explorer-simple-card-trait"
                    src={trait.icon_url}
                  />
                ) : (
                  <GetTraitImage traitType={trait.type} />
                );
              })}
          </div>
          {/* <div>{
            metadata.
            }</div> */}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="col-lg-3 col-md-4 mb-4">
        <div className="layer-image-preview">
          {
            !loading ? Card() : <SpinnerCircular color="#000" />

            // <GalaxisCard
            //   metadata={metadata}
            //   traitTypes={traitTypes}
            //   key={keyForChild}
            // />
          }
        </div>
      </div>
    </>
  );
};

export default ExplorerCard;
