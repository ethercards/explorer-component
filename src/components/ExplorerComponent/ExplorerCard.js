import React, { useEffect, useState } from 'react';
import { GalaxisCard } from 'galaxis-components';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';

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

  const Card = () => {
    return (
      <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <img src={metadata.image} style={{ maxWidth: '100%' }} />
      </div>
    );
  };

  return (
    <>
      <div className="col-lg-3 col-md-4 mb-4">
        <div className="layer-image-preview">
          {
            !loading && Card()

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
