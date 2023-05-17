import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';

const ExplorerCard = ({
  meta,
  traitTypes,
  key,
  keyForChild,
  handleClick,
  serverUrl,
}) => {
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

  const GetTraitImage = ({ traitType }) => {
    if (!traitType) return;
    const trait_type = traitTypes[traitType];
    return (
      <img
        className="explorer-simple-card-trait"
        src={serverUrl + trait_type.icon_white}
      />
    );
    // GALAXIS_BASE_URL + traitType.icon_white;
  };

  const Card = () => {
    return (
      <div
        className="explorer-simple-card"
        onClick={() => handleClick(meta.id)}
      >
        <img src={metadata.image} style={{ maxWidth: '100%' }} />
        <div className="explorer-simple-card-trait-container">
          <div className="explorer-simple-card-token-name">{metadata.name}</div>
          {/* <div>{metadata.tokenId}</div> */}
          <div className="explorer-simple-card-traits">
            {metadata.traits &&
              metadata.traits.length > 0 &&
              metadata.traits.map((trait, index) => {
                return trait.icon_url ? (
                  <div className="explorer-simple-card-trait-div">
                    <img
                      className="explorer-simple-card-trait"
                      src={trait.icon_url}
                      key={index}
                    />
                    {/* <div className="explorer-simple-card-trait-name">
                      {trait.name}
                    </div> */}
                  </div>
                ) : (
                  <GetTraitImage traitType={trait.type} key={index} />
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
      <div className="col-lg-3 col-md-2 mb-4">
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
