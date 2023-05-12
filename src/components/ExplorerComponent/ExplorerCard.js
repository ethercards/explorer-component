import React, { useEffect, useState } from 'react';
import { GalaxisCard } from 'galaxis-components';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';

const ExplorerCard = ({ meta, traitTypes }) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(meta, ' meta');
    const fetchMetadata = async () => {
      setLoading(true);
      await axios
        .get(
          'https://hedgiefund-metadata-server.herokuapp.com/api/metadata/81/2081'
        )
        .then((resp) => setMetadata(resp.data))
        .catch((e) => console.log('error'));
      setLoading(false);
    };
    fetchMetadata();
  }, []);
  useEffect;

  return (
    <>
      <div className="col-lg-3 col-md-4 mb-4">
        <div className="layer-image-preview">
          {loading ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SpinnerCircular color="#000" />
            </div>
          ) : (
            <GalaxisCard metadata={metadata} traitTypes={traitTypes} />
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorerCard;
