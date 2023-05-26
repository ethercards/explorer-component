import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';
import openseaIcon from '../../assets/icons/opensea.svg';
import etherscanIcon from '../../assets/icons/etherscan.svg';
import traitsIcon from '../../assets/icons/traits.svg';
import { ExpContext } from './ExpContext';

const ExplorerCard = ({
  meta,
  traitTypes,
  handleClick,
  selectedItems = [],
  handleOpenOpensea,
  handleEtherscan,
}) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTraits, setShowTraits] = useState(false);
  const { serverUrl, showCardName, columns, cardClass, selectedCardClass } =
    useContext(ExpContext);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const response = await axios.get(meta.tokenURI);
        setMetadata(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
      setLoading(false);
    };

    fetchMetadata();
  }, [meta]);

  const GetTraitImage = ({ traitType }) => {
    if (!traitType) return null;
    const traitTypeData = traitTypes[traitType];
    return (
      <img
        className="explorer-simple-card-trait"
        src={serverUrl + traitTypeData.icon_white}
      />
    );
  };

  const Card = () => {
    const handleCardClick = (e) => {
      handleClick(e, meta.id);
    };

    const handleTraitTogglerClick = () => {
      setShowTraits(!showTraits);
    };

    const handleOpenseaClick = () => {
      handleOpenOpensea(meta.id);
    };

    const handleEtherscanClick = () => {
      handleEtherscan();
    };

    return (
      <div
        className={`explorer-simple-card ${cardClass && cardClass} ${
          selectedCardClass && selectedItems.includes(meta.id)
            ? selectedCardClass
            : ''
        }`}
        onClick={handleCardClick}
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
                    if (trait.icon_url) {
                      return (
                        <div
                          className="explorer-simple-card-trait-div"
                          key={index}
                        >
                          <div className="explorer-simple-card-trait-icon-container">
                            <img
                              className="explorer-simple-card-trait"
                              src={trait.icon_url}
                              alt={`Trait ${index}`}
                            />
                          </div>
                          <div className="explorer-simple-card-trait-name">
                            {trait.name}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <GetTraitImage traitType={trait.type} key={index} />
                      );
                    }
                  })}
                </div>
                <div
                  className="explorer-simple-card-trait-toggler"
                  onClick={handleTraitTogglerClick}
                >
                  <img src={traitsIcon} alt="Traits Icon" />
                  <div className="explorer-simple-card-trait-count">
                    <div>{metadata.traits.length}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="explorer-simple-card-trait-container">
          <div className="explorer-simple-card-token-name">
            {showCardName ? metadata.name : `#${meta.id}`}
          </div>
          <div className="explorer-simple-card-opensea-etherscan">
            <img
              src={openseaIcon}
              style={{ maxHeight: '30px' }}
              onClick={handleOpenseaClick}
              alt="Opensea Icon"
            />
            <img
              src={etherscanIcon}
              style={{ maxHeight: '30px' }}
              onClick={handleEtherscanClick}
              alt="Etherscan Icon"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${columns === 3 ? 'col-lg-4' : 'col-lg-3'}  col-md-2 mb-4`}
    >
      <div className="layer-image-preview">
        {!loading ? <Card /> : <SpinnerCircular color="#000" />}
      </div>
    </div>
  );
};

export default ExplorerCard;
