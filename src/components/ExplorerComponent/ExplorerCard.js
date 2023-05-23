import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';
import openseaIcon from '../../assets/icons/opensea.svg';
import etherscanIcon from '../../assets/icons/etherscan.svg';
import traitsIcon from '../../assets/icons/traits.svg';
const ExplorerCard = ({
  meta,
  traitTypes,
  key,
  keyForChild,
  handleClick,
  serverUrl,
  selectedItems = [],
  handleOpenOpensea,
  handleEtherscan,
  showCardName,
  columns,
  cardClass,
}) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTraits, setShowTraits] = useState(false);
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
  }, [meta]);

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
        className={`explorer-simple-card ${cardClass && cardClass}`}
        onClick={(e) => handleClick(e, meta.id)}
        style={{
          border: selectedItems.includes(meta.id)
            ? '2px solid black'
            : '2px solid transparent',
        }}
      >
        <div className="explorer-simple-card-img-trait">
          <img src={metadata.image} style={{ maxWidth: '100%' }} />
          <div className="explorer-simple-card-traits">
            {metadata.traits && metadata.traits.length > 0 && (
              <>
                <div
                  className={`${
                    showTraits
                      ? 'explorer-simple-card-shown'
                      : 'explorer-simple-card-hided'
                  }`}
                >
                  {metadata.traits.map((trait, index) => {
                    return trait.icon_url ? (
                      <div className="explorer-simple-card-trait-div">
                        <div className="explorer-simple-card-trait-icon-container">
                          <img
                            className="explorer-simple-card-trait"
                            src={trait.icon_url}
                            key={index}
                          />
                        </div>
                        <div className="explorer-simple-card-trait-name">
                          {trait.name}
                        </div>
                      </div>
                    ) : (
                      <GetTraitImage traitType={trait.type} key={index} />
                    );
                  })}
                </div>
                <div
                  className="explorer-simple-card-trait-toggler"
                  onClick={() => setShowTraits(!showTraits)}
                >
                  <img src={traitsIcon} />
                  <div className="explorer-simple-card-trait-count">
                    <div>{metadata.traits.length} </div>
                  </div>
                  {/* // {metadata.traits.length} */}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="explorer-simple-card-trait-container">
          <div className="explorer-simple-card-token-name">
            {showCardName ? metadata.name : '#' + meta.id}
          </div>
          <div className="explorer-simple-card-opensea-etherscan">
            <img
              src={openseaIcon}
              style={{ maxHeight: '30px' }}
              onClick={() => handleOpenOpensea(meta.id)}
            />
            <img
              src={etherscanIcon}
              style={{ maxHeight: '30px' }}
              onClick={() => handleEtherscan()}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`${columns === 3 ? `col-lg-4` : 'col-lg-3'}  col-md-2 mb-4`}
      >
        <div className="layer-image-preview">
          {!loading ? Card() : <SpinnerCircular color="#000" />}
        </div>
      </div>
    </>
  );
};

export default ExplorerCard;
