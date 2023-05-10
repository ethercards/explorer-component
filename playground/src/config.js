const dev = {
  DEPLOYED_NTW_NAME: 'rinkeby',
  DEPLOYED_CHAIN_ID: 4,
  INFURA_ID: 'a5e79e6ee9a14236b385e47849805596',
  FORTMATIC_KEY: 'pk_test_DD2BBA8AAA1D4FED',
  RPC_URL: 'https://rinkeby.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc',
  ETHERSCAN_URL: 'https://rinkeby.etherscan.io/',
  OPENSEA_URL: 'https://testnets.opensea.io/',
  API_URL: 'https://galaxis-web-backend-staging.herokuapp.com',
  PREVIEW_URL: 'https://ssp-server-v2.herokuapp.com/api/project-session',
  AWS_URL:
    'https://galaxis-backend-staging.s3.eu-central-1.amazonaws.com/media',

  AGGREGATOR_URL: 'https://nft-aggregator-rinkeby.herokuapp.com/token',

  EC_TOKEN_ADDRESS: '0xAAD4475343f5150E33d6194270f04e7e5968A2f8',
  PHOENIX_CONTRACT_ADDRESS: '0x0937aD2d26D1f37c2d8FdA1b4c071e8f3786aF5B',
  /* 
  COLLIE_BUDDZ_SALE_ADDRESS: '0xc67c64c0dCA8E52BF2Aff00DF151535d14dA5A19',
  COLLIE_BUDDZ_TOKEN_ADDRESS: '0xc3C152e9F7990b2dceA5a89bBEeD0Df5Ff1C2440', */

  /*  COLLIE_BUDDZ_SALE_ADDRESS: '0x926f72A3e24328272b723E2841f7Ec0B77BE15F0',
  COLLIE_BUDDZ_TOKEN_ADDRESS: '0x1132447D418762C63DC6083768C2E6086F3F0F64', */
};

const prod = {
  DEPLOYED_NTW_NAME: 'mainnet',
  DEPLOYED_CHAIN_ID: 1,
  INFURA_ID: 'a5e79e6ee9a14236b385e47849805596',
  FORTMATIC_KEY: 'pk_live_FBFF1F05F2879F29',
  RPC_URL: 'https://mainnet.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc',
  //RPC_URL: 'https://icy-weathered-glade.quiknode.pro/74e3e2900f41260b429e8ac065b8bee720298c94',
  ETHERSCAN_URL: 'https://etherscan.io/',
  OPENSEA_URL: 'https://opensea.io/',

  API_URL: 'https://cms.galaxis.xyz',
  PREVIEW_URL: 'https://launchpad-backend.herokuapp.com/api/project-session',
  AWS_URL: 'https://galaxis-web.s3.amazonaws.com/media',

  AGGREGATOR_URL: 'https://nft-aggregator.herokuapp.com/token',

  EC_TOKEN_ADDRESS: '0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8',
  PHOENIX_CONTRACT_ADDRESS: '0x55B3154Ad761405B0cdd27355943Eb808d40b5A1',

  // COLLIE_BUDDZ_SALE_ADDRESS: '0x58635162ed6a528078bd88537c74b4390cbd8321',
  // COLLIE_BUDDZ_TOKEN_ADDRESS: '0xedec929e45e1fc9d151e2dd2c416af4a43075bfa',
};

const common = {
  OPENSEA_COLLECTION: 'https://api.opensea.io/api/v1/collection',
  GOOGLE_API: 'https://www.googleapis.com/youtube/v3/search',
  RECAPCHA_SITEKEY: '6LfAjcYeAAAAAJTxnTgx_JVndCSmQgU1gqzEIwoL',
  NO_PROJECT_FOUND: 'no project found',
};

// if use npm/yarn start,  NODE_ENV = "development"
// if use npm/yarn build,  NODE_ENV = "production"
let envConfig = prod; // process.env.NODE_ENV === "development" ? dev : prod
let config = { ...envConfig, ...common };

export default config;
