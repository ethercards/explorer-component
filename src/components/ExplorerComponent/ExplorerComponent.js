import React from 'react';
import ExplorerCards from './ExplorerCards';
const meta = {
  tokenId: 200,
  image:
    'https://ether-cards.mypinata.cloud/ipfs/QmVwHf3BGbw6Cdz27AZVfXB29La4QGUL1K4zL5NuHJKtGe/81/2081.jpeg',
  name: 'The Hedgie Fund #200',
  collection_type: 'galaxis',
  animation_url:
    'https://explorer.galaxis.xyz/#/render?hedgiefund-metadata-server.herokuapp.com/api/metadata/81/2081',
  sides: [
    {
      id: 1,
      dna: '1637050516140514',
    },
  ],
  collection_name: 'The Hedgie Fund',
  attributes: [
    {
      value: "Sam's room #2",
      trait_type: 'Background',
    },
    {
      value: 'Combed Yellow',
      trait_type: 'Prickles',
    },
    {
      value: 'Plain',
      trait_type: 'Body',
    },
    {
      value: 'Up',
      trait_type: 'Ears',
    },
    {
      value: 'Laugh 2',
      trait_type: 'Face',
    },
    {
      value: 'Policeman Hat',
      trait_type: 'Hat',
    },
    {
      value: 'NONE',
      trait_type: 'Birthmarks',
    },
    {
      value: 'Arms Folded',
      trait_type: 'Arms',
    },
    {
      trait_type: 'Utility trait',
      value: 'Background',
    },
    {
      trait_type: 'Utility trait',
      value: 'Face',
    },
    {
      trait_type: 'Utility trait',
      value: 'Hat',
    },
    {
      trait_type: 'Utility trait',
      value: 'Arms',
    },
  ],
  traits: [
    {
      id: 1,
      name: 'Background',
      type: '7',
      description:
        "People with autism like their own space, and bedrooms are often a 'safe space'.",
    },
    {
      id: 41,
      name: 'Face',
      type: '7',
      description: 'Sam is happiest with his family.',
    },
    {
      id: 61,
      name: 'Hat',
      type: '7',
      description:
        'Sam can lose himself in his imaginary world for hours on end.',
    },
    {
      id: 77,
      name: 'Arms',
      type: '7',
      description:
        "Sam folds his arms to show that he is not happy. He may be semi-verbal but this doesn't mean he can't communicate!",
    },
  ],
};
const ExplorerComponent = () => {
  return (
    <>
      <ExplorerCards nfts={[1, 2, 3, 4, 5, 6]} meta={meta} />
    </>
  );
};

export default ExplorerComponent;
