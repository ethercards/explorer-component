import React, { useEffect, useState } from 'react';
import { GalaxisCard } from 'galaxis-components';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';

const ExplorerCard = ({ traitTypes }) => {
  const [metadata, setMetadata] = useState(null);
  useEffect(() => {
    const fetchMetadata = async () => {
      await axios
        .get(
          'https://hedgiefund-metadata-server.herokuapp.com/api/metadata/81/2081'
        )
        .then((resp) => setMetadata(resp.data))
        .catch((e) => console.log('error'));
    };
    fetchMetadata();
  }, []);
  useEffect;

  return (
    <>
      {metadata && (
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="layer-image-preview">
            <GalaxisCard metadata={metadata} traitTypes={traitTypes} />
          </div>
        </div>
      )}
    </>
  );
};

export default ExplorerCard;
