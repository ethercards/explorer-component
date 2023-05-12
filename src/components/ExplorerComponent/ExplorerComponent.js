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

const trait_type = [
  {
    id: 1,
    name: 'Physical Redeemables',
    icon_white:
      '/storage/app/assets/public/trait_type_icons/physical-white.svg',
    icon_orange:
      '/storage/app/assets/public/trait_type_icons/physical-orange.svg',
    icon_black:
      '/storage/app/assets/public/trait_type_icons/physical-black.svg',
  },
  {
    id: 2,
    name: 'Digital Redeemables',
    icon_white: '/storage/app/assets/public/trait_type_icons/digital-white.svg',
    icon_orange:
      '/storage/app/assets/public/trait_type_icons/digital-orange.svg',
    icon_black: '/storage/app/assets/public/trait_type_icons/digital-black.svg',
  },
  {
    id: 3,
    name: 'Discount Traits',
    icon_white:
      '/storage/app/assets/public/trait_type_icons/discount-white.svg',
    icon_orange:
      '/storage/app/assets/public/trait_type_icons/discount-orange.svg',
    icon_black:
      '/storage/app/assets/public/trait_type_icons/discount-black.svg',
  },
  {
    id: 4,
    name: 'Access Traits',
    icon_white: '/storage/app/assets/public/trait_type_icons/access-white.svg',
    icon_orange:
      '/storage/app/assets/public/trait_type_icons/access-orange.svg',
    icon_black: '/storage/app/assets/public/trait_type_icons/access-black.svg',
  },
  {
    id: 5,
    name: 'Modifiers',
    icon_white:
      '/storage/app/assets/public/trait_type_icons/modifier-white.svg',
    icon_orange:
      '/storage/app/assets/public/trait_type_icons/modifier-orange.svg',
    icon_black:
      '/storage/app/assets/public/trait_type_icons/modifier-black.svg',
  },
  {
    id: 6,
    name: 'Meeting',
    icon_white: '/storage/app/assets/public/trait_type_icons/meeting-white.svg',
    icon_orange:
      '/storage/app/assets/public/trait_type_icons/meeting-orange.svg',
    icon_black: '/storage/app/assets/public/trait_type_icons/meeting-black.svg',
  },
  {
    id: 7,
    name: 'Badges',
    icon_white: '/storage/app/assets/public/trait_type_icons/badge-white.svg',
    icon_orange: '/storage/app/assets/public/trait_type_icons/badge-orange.svg',
    icon_black: '/storage/app/assets/public/trait_type_icons/badge-black.svg',
  },
  {
    id: 8,
    name: 'Signature',
    icon_white:
      '/storage/app/assets/public/trait_type_icons/autograph-white.svg',
    icon_orange:
      '/storage/app/assets/public/trait_type_icons/autograph-orange.svg',
    icon_black:
      '/storage/app/assets/public/trait_type_icons/autograph-black.svg',
  },
];
const ExplorerComponent = () => {
  return (
    <>
      <ExplorerCards
        nfts={[
          1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5,
          6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4,
          5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
        ]}
        traitTypes={trait_type}
        meta={meta}
      />
    </>
  );
};

export default ExplorerComponent;
