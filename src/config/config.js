const common = {
  INFURA_ID: '96a0984ce6264f5a8edcf752673de5b8',
  GALAXIS_REGISTRY: '0x1e8150050A7a4715aad42b905C08df76883f396F',
  OPENSEA_COLLECTION: 'https://api.opensea.io/api/v1/collection',
  GOOGLE_API: 'https://www.googleapis.com/youtube/v3/search',
  RECAPCHA_SITEKEY: '6LfAjcYeAAAAAJTxnTgx_JVndCSmQgU1gqzEIwoL',
  NO_PROJECT_FOUND: 'no project found',
  COMMUNITYSPACEURL: 'https://galaxis.xyz/#'
};

const staging = {
  DEPLOYED_NTW_NAME: 'goerli',
  DEPLOYED_CHAIN_ID: 5,
  FORTMATIC_KEY: 'pk_test_DD2BBA8AAA1D4FED',
  RPC_URL: `https://goerli.infura.io/v3/${common.INFURA_ID}`,
  ETHERSCAN_URL: 'https://goerli.etherscan.io',
  POLYGONSCAN_URL: 'https://mumbai.polygonscan.com',
  OPENSEA_URL: 'https://testnets.opensea.io/',

  API_URL: 'https://cms.staging.galaxis.xyz',

  PREVIEW_URL: 'https://mcb.staging.galaxis.xyz/api/project-session',
  LAUNCHPAD_API_URL: 'https://mcb.staging.galaxis.xyz/api',
  PREVIEW_IMAGES: 'https://mcb.staging.galaxis.xyz/projects/',
  AWS_URL: 'https://cms.staging.galaxis.xyz/storage/app/media',

  AGGREGATOR_URL: 'https://nft-aggregator-goerli.herokuapp.com/token',

  EC_TOKEN_ADDRESS: '0xAAD4475343f5150E33d6194270f04e7e5968A2f8',
  PHOENIX_CONTRACT_ADDRESS: '0x0937aD2d26D1f37c2d8FdA1b4c071e8f3786aF5B',
 
  CROSSMINT_CLIENT_ID: '7de2bbab-cec3-456b-a2e1-96bbd99cb8ad',
  CROSSMINT_ENV: 'staging',
  CHAINS: [
    {
        id: "0x5",
        token: "gETH",
        label: "Goerli",
        rpcUrl: `https://goerli.infura.io/v3/${common.INFURA_ID}`, // rpcURL required for wallet balances
        blockExplorerUrl: "https://goerli.etherscan.io"
    },
    {
        id: "0x13881",
        token: "mMATIC",
        label: "Polygon Mumbai Testnet",
        rpcUrl: `https://polygon-mumbai.infura.io/v3/${common.INFURA_ID}`,
        blockExplorerUrl: "https://mumbai.polygonscan.com"
    },
]

};

const prod = {
  DEPLOYED_NTW_NAME: 'mainnet',
  DEPLOYED_CHAIN_ID: 1,
  RPC_URL: `https://mainnet.infura.io/v3/${common.INFURA_ID}`,
  FORTMATIC_KEY: 'pk_live_FBFF1F05F2879F29',
  ETHERSCAN_URL: 'https://etherscan.io',
  POLYGONSCAN_URL: 'https://polygonscan.com',
  OPENSEA_URL: 'https://opensea.io/',

  API_URL: 'https://cms.galaxis.xyz',
  PREVIEW_URL: 'https://mcb.galaxis.xyz/api/project-session',
  LAUNCHPAD_API_URL: 'https://mcb.galaxis.xyz/api',
  PREVIEW_IMAGES: 'https://mcb.galaxis.xyz/projects/',
  AWS_URL: 'https://cms.galaxis.xyz/storage/app/media',

  AGGREGATOR_URL: 'https://nft-aggregator.herokuapp.com/token',

  EC_TOKEN_ADDRESS: '0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8',
  PHOENIX_CONTRACT_ADDRESS: '0x55B3154Ad761405B0cdd27355943Eb808d40b5A1',

  CROSSMINT_CLIENT_ID: 'b3f5189b-66fe-43d7-8295-c73f9fa3e3ef',
  CROSSMINT_ENV: '',
  CHAINS: [
    {
        id: "0x1", // chain ID must be in hexadecimel
        token: "ETH", // main chain token
        label: "Ethereum Mainnet",
        rpcUrl: `https://mainnet.infura.io/v3/${common.INFURA_ID}`, // rpcURL required for wallet balances
        blockExplorerUrl: "https://etherscan.io"
    },
    {
        id: "0x89",
        token: "MATIC",
        label: "Polygon Mainnet",
        rpcUrl: `https://polygon-mainnet.infura.io/v3/${common.INFURA_ID}`,
        blockExplorerUrl: "https://polygonscan.com"
    },
]
  
};

// if use npm/yarn start,  NODE_ENV = "development"
// if use npm/yarn build,  NODE_ENV = "production"
let envConfig = prod; // process.env.NODE_ENV === "development" ? dev : prod
let config = { ...envConfig, ...common };

export default config;
