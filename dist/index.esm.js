import React, { useState, useEffect, useRef, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'galaxis-components';
import axios from 'axios';
import { SpinnerCircular, SpinnerDotted } from 'spinners-react';
import { ethers, Contract as Contract$1 } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { Zoom } from 'zoom-next';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

const loadNext = (nfts, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards) => {
  let c = [];
  let end = nfts.length < ITEMS_PER_PAGE ? nfts.length : ITEMS_PER_PAGE;

  for (let i = 0; i < end; i++) {
    if (currentPageRef.current * ITEMS_PER_PAGE + i < nfts.length) {
      c.push(nfts[currentPageRef.current * ITEMS_PER_PAGE + i]);
    }
  }

  setCards(cards => cards.concat(c));
  setCurrentPage(currentPageRef.current + 1);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".layer-image-preview {\r\n  padding-bottom: 20px;\r\n  text-align: center;\r\n}\r\n.infinite-scroll-component__outerdiv {\r\n  max-width: 1200px;\r\n  margin: 0 auto;\r\n}\r\n.infinite-scroll-component {\r\n  overflow-x: hidden !important;\r\n}\r\n\r\n/* card */\r\n.explorer-simple-card-container {\r\n}\r\n.explorer-simple-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  text-align: left;\r\n  border-radius: 10px;\r\n  overflow: hidden;\r\n  color: #fff;\r\n}\r\n.explorer-simple-card-trait-container {\r\n  padding: 10px;\r\n  background: linear-gradient(rgb(20, 33, 46), rgb(14, 25, 36));\r\n}\r\n.explorer-simple-card-trait {\r\n  max-width: 30px;\r\n}\r\n.explorer-simple-card-traits {\r\n  margin-top: 10px;\r\n  min-height: 30px;\r\n}\r\n";
styleInject(css_248z);

const GALAXIS_BASE_URL = 'https://cms.galaxis.xyz/';

const ExplorerCard = _ref => {
  let {
    meta,
    traitTypes,
    key,
    keyForChild
  } = _ref;
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const metaURL = meta.tokenURI;

    const fetchMetadata = async () => {
      setLoading(true);
      await axios.get(metaURL).then(resp => setMetadata(resp.data)).catch(e => console.log('error'));
      setLoading(false);
    };

    fetchMetadata();
  }, []);

  const GetTraitImage = _ref2 => {
    let {
      traitType
    } = _ref2;
    if (!traitType) return;
    const trait_type = traitTypes[traitType];
    return /*#__PURE__*/React.createElement("img", {
      className: "explorer-simple-card-trait",
      src: GALAXIS_BASE_URL + trait_type.icon_white
    }); // GALAXIS_BASE_URL + traitType.icon_white;
  };

  const Card = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card"
    }, /*#__PURE__*/React.createElement("img", {
      src: metadata.image,
      style: {
        maxWidth: '100%'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-trait-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-token-name"
    }, metadata.name), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-traits"
    }, metadata.traits && metadata.traits.length > 0 && metadata.traits.map(trait => {
      return trait.icon_url ? /*#__PURE__*/React.createElement("img", {
        className: "explorer-simple-card-trait",
        src: trait.icon_url
      }) : /*#__PURE__*/React.createElement(GetTraitImage, {
        traitType: trait.type
      });
    }))));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-lg-3 col-md-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer-image-preview"
  }, !loading ? Card() : /*#__PURE__*/React.createElement(SpinnerCircular, {
    color: "#000"
  }) // <GalaxisCard
  //   metadata={metadata}
  //   traitTypes={traitTypes}
  //   key={keyForChild}
  // />
  )));
};

const ExplorerCards = _ref => {
  let {
    nftList,
    traitTypes,
    height
  } = _ref;
  const ITEMS_PER_PAGE = 29;
  const [cards, setCards] = useState([]);
  const [currentPage, _setCurrentPage] = useState(0);
  const currentPageRef = useRef(currentPage);

  const setCurrentPage = val => {
    currentPageRef.current = val;

    _setCurrentPage(val);
  };

  useEffect(() => {
    setCards([]);
    setCurrentPage(0);
    loadNext(nftList, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards);
  }, [nftList]);

  const renderCards = () => {
    return cards.map((meta, i) => {
      return /*#__PURE__*/React.createElement(ExplorerCard, {
        meta: meta,
        traitTypes: traitTypes,
        key: i,
        keyForChild: i
      });
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(InfiniteScroll, {
    dataLength: cards.length,
    height: height || '100vh',
    next: () => loadNext(nftList, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards),
    pullDownToRefreshThreshold: 500,
    hasMore: currentPageRef.current * ITEMS_PER_PAGE < nftList.length,
    scrollThreshold: "1200px" // scrollableTarget="content-container"
    // initialScrollY={1000}
    ,
    loader: /*#__PURE__*/React.createElement("h4", {
      style: {
        textAlign: 'center'
      }
    }, "Loading...")
  }, /*#__PURE__*/React.createElement("div", {
    className: `row small-gutters px-2 mx-0  `,
    style: {
      padding: '10px'
    }
  }, renderCards()))));
};

const common = {
  INFURA_ID: '96a0984ce6264f5a8edcf752673de5b8',
  GALAXIS_REGISTRY: '0x1e8150050A7a4715aad42b905C08df76883f396F',
  OPENSEA_COLLECTION: 'https://api.opensea.io/api/v1/collection',
  GOOGLE_API: 'https://www.googleapis.com/youtube/v3/search',
  RECAPCHA_SITEKEY: '6LfAjcYeAAAAAJTxnTgx_JVndCSmQgU1gqzEIwoL',
  NO_PROJECT_FOUND: 'no project found',
  COMMUNITYSPACEURL: 'https://galaxis.xyz/#'
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
  CHAINS: [{
    id: "0x1",
    // chain ID must be in hexadecimel
    token: "ETH",
    // main chain token
    label: "Ethereum Mainnet",
    rpcUrl: `https://mainnet.infura.io/v3/${common.INFURA_ID}`,
    // rpcURL required for wallet balances
    blockExplorerUrl: "https://etherscan.io"
  }, {
    id: "0x89",
    token: "MATIC",
    label: "Polygon Mainnet",
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${common.INFURA_ID}`,
    blockExplorerUrl: "https://polygonscan.com"
  }]
}; // if use npm/yarn start,  NODE_ENV = "development"
// if use npm/yarn build,  NODE_ENV = "production"

let envConfig = prod; // process.env.NODE_ENV === "development" ? dev : prod

let config = { ...envConfig,
  ...common
};

var _format = "hh-sol-artifact-1";
var contractName = "Zoom2";
var sourceName = "contracts/Zoom2.sol";
var abi$2 = [
	{
		inputs: [
			{
				internalType: "bytes",
				name: "inputData",
				type: "bytes"
			}
		],
		name: "combine",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];
var bytecode = "0x608060405234801561001057600080fd5b506104a0806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063124542e314610030575b600080fd5b6100e96004803603602081101561004657600080fd5b810190808035906020019064010000000081111561006357600080fd5b82018360208201111561007557600080fd5b8035906020019184600183028401116401000000008311171561009757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061023c565b60405180806020018060200180602001848103845287818151815260200191508051906020019080838360005b83811015610131578082015181840152602081019050610116565b50505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b50848103835286818151815260200191508051906020019080838360005b8381101561019757808201518184015260208101905061017c565b50505050905090810190601f1680156101c45780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b838110156101fd5780820151818401526020810190506101e2565b50505050905090810190601f16801561022a5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b60608060608060608060208701600381015160001a610100600283015160001a020159604052604051945060408102855260005b6002820281101561029257600060208202602088010152600181019050610270565b5059604052604051935060208102845260005b818110156102c4576000602082026020870101526001810190506102a5565b506006820191505960405260206040510192506000602084016000805b8481101561044757600286015160001a610100600188015160001a020160008052865160001a600381141561031557600093505b600481146002821417156103c257600488015160001a61010060038a015160001a0201600689015160001a61010060058b015160001a0201600283141561037c576040820260208e0101600160146101000a03600c8383510103511660005260088b019a50505b60048314156103bf576040820260208e010151518087821488831117156103a95787820390506001880197505b818811156103b657600090505b8060208d015250505b50505b60006002821414156103ed57600888019750600160146101000a03600c890351166000526014880197505b6000516000806000858c856207a120fa503d6000883e3d9050866040860260208f010152806040860260408f010152838a019950808701965080880197508088036020860260208e010152505050506001810190506102e1565b50828652602082016040525050505050808288955095509550505050919390925056fea264697066735822122057a5d2e5a6e7eed9cbc9707c4487c4deb46cbab8fa7c83a798ede1b3763cae6a64736f6c63430007050033";
var deployedBytecode = "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c8063124542e314610030575b600080fd5b6100e96004803603602081101561004657600080fd5b810190808035906020019064010000000081111561006357600080fd5b82018360208201111561007557600080fd5b8035906020019184600183028401116401000000008311171561009757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061023c565b60405180806020018060200180602001848103845287818151815260200191508051906020019080838360005b83811015610131578082015181840152602081019050610116565b50505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b50848103835286818151815260200191508051906020019080838360005b8381101561019757808201518184015260208101905061017c565b50505050905090810190601f1680156101c45780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b838110156101fd5780820151818401526020810190506101e2565b50505050905090810190601f16801561022a5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b60608060608060608060208701600381015160001a610100600283015160001a020159604052604051945060408102855260005b6002820281101561029257600060208202602088010152600181019050610270565b5059604052604051935060208102845260005b818110156102c4576000602082026020870101526001810190506102a5565b506006820191505960405260206040510192506000602084016000805b8481101561044757600286015160001a610100600188015160001a020160008052865160001a600381141561031557600093505b600481146002821417156103c257600488015160001a61010060038a015160001a0201600689015160001a61010060058b015160001a0201600283141561037c576040820260208e0101600160146101000a03600c8383510103511660005260088b019a50505b60048314156103bf576040820260208e010151518087821488831117156103a95787820390506001880197505b818811156103b657600090505b8060208d015250505b50505b60006002821414156103ed57600888019750600160146101000a03600c890351166000526014880197505b6000516000806000858c856207a120fa503d6000883e3d9050866040860260208f010152806040860260408f010152838a019950808701965080880197508088036020860260208e010152505050506001810190506102e1565b50828652602082016040525050505050808288955095509550505050919390925056fea264697066735822122057a5d2e5a6e7eed9cbc9707c4487c4deb46cbab8fa7c83a798ede1b3763cae6a64736f6c63430007050033";
var linkReferences = {
};
var deployedLinkReferences = {
};
var ZoomAbi = {
	_format: _format,
	contractName: contractName,
	sourceName: sourceName,
	abi: abi$2,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	linkReferences: linkReferences,
	deployedLinkReferences: deployedLinkReferences
};

const SupportedChainId = {
  MAINNET: 1,
  GOERLI: 5,
  POLYGON: 137,
  MUMBAI: 80001
};

const ZOOM_2_ADDRESSES = {
  [SupportedChainId.MAINNET]: "0x7cdF091AF6a9ED75E3192500d3e5BB0f63e22Dea",
  [SupportedChainId.GOERLI]: "0xebC7d793d062371C11cB802e7D49eEAA0c30EB06"
};

function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
} // account is not optional

function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
} // account is optional


function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
} // account is optional


function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
const getProvider = contractChainId => {
  const chains = config.CHAINS;
  const chain = chains.find(chain => parseInt(chain.id) == contractChainId);

  if (chain != null) {
    return new ethers.providers.JsonRpcProvider(chain.rpcUrl);
  }
};
function useZoom2Contract() {
  return getContract(ZOOM_2_ADDRESSES, abi$2, false);
}

var abi$1 = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "key",
				type: "string"
			},
			{
				indexed: false,
				internalType: "address",
				name: "value",
				type: "address"
			}
		],
		name: "AddressChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isAdmin",
				type: "bool"
			}
		],
		name: "AdminUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "app",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "AppAdminChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "key",
				type: "string"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "value",
				type: "bool"
			}
		],
		name: "BooleanChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint8",
				name: "version",
				type: "uint8"
			}
		],
		name: "Initialized",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "key",
				type: "string"
			},
			{
				indexed: false,
				internalType: "string",
				name: "value",
				type: "string"
			}
		],
		name: "StringChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "key",
				type: "string"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "UintChanged",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "addressEntries",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "adminEntries",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "adminHas",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "admins",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "appAdminCounter",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "appAdminEntries",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "app_admins",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "boolEntries",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "getRegistryAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "getRegistryBool",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "getRegistryString",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "getRegistryUINT",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "initialize",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "isAdmin",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "app",
				type: "address"
			},
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "isAppAdmin",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "nextAdmin",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "numberOfAddresses",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "numberOfBooleans",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "numberOfStrings",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "numberOfUINTs",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "bool",
				name: "status",
				type: "bool"
			}
		],
		name: "setAdmin",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "app",
				type: "address"
			},
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "setAppAdmin",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "fn",
				type: "string"
			},
			{
				internalType: "address",
				name: "value",
				type: "address"
			}
		],
		name: "setRegistryAddress",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "fn",
				type: "string"
			},
			{
				internalType: "bool",
				name: "value",
				type: "bool"
			}
		],
		name: "setRegistryBool",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "fn",
				type: "string"
			},
			{
				internalType: "string",
				name: "value",
				type: "string"
			}
		],
		name: "setRegistryString",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "fn",
				type: "string"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "setRegistryUINT",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "stringEntries",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "uintEntries",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];
var GalaxisRegistry = {
	abi: abi$1
};

var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "contractURI",
				type: "string"
			}
		],
		name: "ContractURIset",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		name: "Locked",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "stage",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "randNumber",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_shiftsBy",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_start",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_end",
				type: "uint256"
			}
		],
		name: "RandomProcessed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "_address",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "mode",
				type: "bool"
			}
		],
		name: "contractControllerEvent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "_address",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "mode",
				type: "bool"
			}
		],
		name: "contractManagerEvent",
		type: "event"
	},
	{
		inputs: [
		],
		name: "REGISTRY_KEY_RANDOM_CONTRACT",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "TheRegistry",
		outputs: [
			{
				internalType: "contract IRegistryConsumer",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			}
		],
		name: "_reserved",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "contractURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "currentRevealCount",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "n",
				type: "uint256"
			}
		],
		name: "findRevealRangeForN",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_type",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "_index",
				type: "uint256"
			}
		],
		name: "getAccessAt",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_type",
				type: "uint8"
			},
			{
				internalType: "address",
				name: "_addr",
				type: "address"
			}
		],
		name: "getAccessContains",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_type",
				type: "uint8"
			}
		],
		name: "getAccessLength",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getFirstGiveawayCardId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getTokenInfoForSale",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "projectID",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "maxSupply",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "reservedSupply",
						type: "uint256"
					}
				],
				internalType: "struct TokenInfoForSale",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "giveawaySupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "lastReveal",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "lastRevealRequested",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "maxSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_index",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_recipient",
				type: "address"
			}
		],
		name: "mintGiveawayCard",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "numberOfCards",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "mintIncrementalCards",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "numberOfCards",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "mintReservedCards",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "mintedReserve",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "mintedSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_random",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "_requestId",
				type: "bytes32"
			}
		],
		name: "process",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "projectID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "requestToRevealId",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "reservedSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_tracker",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "id",
				type: "uint256"
			}
		],
		name: "retrieve721",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_tracker",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "retrieveERC20",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "retrieveETH",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "revealAtCurrentSupply",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "revealURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			}
		],
		name: "reveals",
		outputs: [
			{
				internalType: "bytes32",
				name: "REQUEST_ID",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "RANDOM_NUM",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "SHIFT",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "RANGE_START",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "RANGE_END",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "processed",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "_data",
				type: "bytes"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_type",
				type: "uint8"
			},
			{
				internalType: "address",
				name: "_address",
				type: "address"
			},
			{
				internalType: "bool",
				name: "_mode",
				type: "bool"
			}
		],
		name: "setAccess",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_contractURI",
				type: "string"
			}
		],
		name: "setContractURI",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_tokenPreRevealURI",
				type: "string"
			}
		],
		name: "setPreRevealURI",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_tokenRevealURI",
				type: "string"
			}
		],
		name: "setRevealURI",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "_locked",
				type: "bool"
			}
		],
		name: "setTransferLock",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			}
		],
		name: "setup",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "projectID",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "maxSupply",
						type: "uint256"
					},
					{
						internalType: "string",
						name: "erc721name",
						type: "string"
					},
					{
						internalType: "string",
						name: "erc721symbol",
						type: "string"
					},
					{
						internalType: "string",
						name: "tokenPreRevealURI",
						type: "string"
					},
					{
						internalType: "string",
						name: "tokenRevealURI",
						type: "string"
					},
					{
						internalType: "bool",
						name: "transferLocked",
						type: "bool"
					},
					{
						internalType: "uint256",
						name: "reservedSupply",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "giveawaySupply",
						type: "uint256"
					}
				],
				internalType: "struct TokenConstructorConfig",
				name: "config",
				type: "tuple"
			}
		],
		name: "setup",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "tellEverything",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "name",
						type: "string"
					},
					{
						internalType: "string",
						name: "symbol",
						type: "string"
					},
					{
						internalType: "uint256",
						name: "projectID",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "maxSupply",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "mintedSupply",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "mintedReserve",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "reservedSupply",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "giveawaySupply",
						type: "uint256"
					},
					{
						internalType: "string",
						name: "tokenPreRevealURI",
						type: "string"
					},
					{
						internalType: "string",
						name: "tokenRevealURI",
						type: "string"
					},
					{
						internalType: "bool",
						name: "transferLocked",
						type: "bool"
					},
					{
						internalType: "bool",
						name: "lastRevealRequested",
						type: "bool"
					},
					{
						internalType: "uint256",
						name: "totalSupply",
						type: "uint256"
					},
					{
						components: [
							{
								internalType: "bytes32",
								name: "REQUEST_ID",
								type: "bytes32"
							},
							{
								internalType: "uint256",
								name: "RANDOM_NUM",
								type: "uint256"
							},
							{
								internalType: "uint256",
								name: "SHIFT",
								type: "uint256"
							},
							{
								internalType: "uint256",
								name: "RANGE_START",
								type: "uint256"
							},
							{
								internalType: "uint256",
								name: "RANGE_END",
								type: "uint256"
							},
							{
								internalType: "bool",
								name: "processed",
								type: "bool"
							}
						],
						internalType: "struct revealStruct[]",
						name: "reveals",
						type: "tuple[]"
					},
					{
						internalType: "address",
						name: "owner",
						type: "address"
					},
					{
						internalType: "address[]",
						name: "managers",
						type: "address[]"
					},
					{
						internalType: "address[]",
						name: "controllers",
						type: "address[]"
					}
				],
				internalType: "struct TokenInfo",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenOfOwnerByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "tokenPreRevealURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "tokenRevealURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			}
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "transferLocked",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "n",
				type: "uint256"
			}
		],
		name: "uri",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];
var tokenABI = {
	abi: abi
};

const zoomFetchTokenUris = async (contract, zoom2, address) => {
  const nt = await contract.balanceOf(address);
  const ZoomLibraryInstance = new Zoom({
    use_reference_calls: true
  });

  if (nt > 0) {
    const calls = [];

    for (let i = 0; i < nt; i += 1) {
      const tId = ZoomLibraryInstance.addMappingCountCall(contract, ['tokenOfOwnerByIndex', [address, i]], 'tokenOfOwnerByIndex(address,uint256) returns (uint256)', [{
        contract: contract,
        mapAndParams: ['tokenURI(uint256)', [i]]
      }]);
      calls.push(tId);
      const tUri = ZoomLibraryInstance.addType5Call(contract, ['tokenURI(uint256)', [i]], 'tokenURI(uint256) returns (string)');
      calls.push(tUri);
    }

    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();
    const combinedResult = await zoom2.combine(ZoomQueryBinary);
    ZoomLibraryInstance.resultsToCache(combinedResult, ZoomQueryBinary);
    const tokenIds = [];

    for (let i = 0; i < nt * 2; i += 2) {
      const id = ZoomLibraryInstance.decodeCall(calls[i]).toString();
      const tokenURI = ZoomLibraryInstance.decodeCall(calls[i + 1]).toString();
      tokenIds.push({
        id,
        tokenURI
      });
    }

    return tokenIds.sort((a, b) => {
      return Number(a.tokenId) - Number(b.tokenId);
    });
  }
};

var useGetNftsList = function useGetNftsList(chainId, contractAddres, address) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      zoomContract = _useState2[0],
      setZoomContract = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      nftList = _useState4[0],
      setNftList = _useState4[1];

  var provider = useMemo(function () {
    return getProvider(chainId);
  }, [chainId]); //provider

  var tokenContract = useMemo(function () {
    return new Contract$1(contractAddres, tokenABI.abi, provider);
  }, [contractAddres]);
  useEffect( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var galaxisRegistry, zoomAddress, contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!provider) {
              _context.next = 7;
              break;
            }

            galaxisRegistry = getContract(config.GALAXIS_REGISTRY, GalaxisRegistry.abi, provider, false);

            if (!galaxisRegistry) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return galaxisRegistry.getRegistryAddress('ZOOM').catch(function (e) {
              console.log('registry error', e);
            });

          case 5:
            zoomAddress = _context.sent;

          case 6:
            if (zoomAddress) {
              contract = getContract(zoomAddress, ZoomAbi.abi, provider, false);

              if (contract) {
                setZoomContract(contract);
              }
            } else {
              zoomAddress = useZoom2Contract();
              setZoomContract(zoomAddress);
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [chainId, provider]);
  useEffect( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(zoomContract && tokenContract && address)) {
              _context2.next = 3;
              break;
            }

            _context2.next = 3;
            return zoomFetchTokenUris(tokenContract, zoomContract, address).then(function (res) {
              setNftList(res);
            }).catch(function (e) {
              console.log(e);
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [zoomContract, tokenContract, address]);
  return {
    nftList: nftList
  };
};

var ExplorerComponent = function ExplorerComponent(_ref) {
  var tokenAddres = _ref.tokenAddres,
      poolAddress = _ref.poolAddress,
      chainId = _ref.chainId;

  var _useGetNftsList = useGetNftsList(chainId, tokenAddres, poolAddress),
      nftList = _useGetNftsList.nftList;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      traitTypes = _useState2[0],
      setTraitTypes = _useState2[1];

  useEffect(function () {
    var getTraitTypes = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.get('https://cms.galaxis.xyz/trait_types').then(function (resp) {
                  return setTraitTypes(resp.data);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getTraitTypes() {
        return _ref2.apply(this, arguments);
      };
    }();

    getTraitTypes();
  }, []);
  console.log(nftList, ' nft list');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, nftList.length > 0 ? /*#__PURE__*/React.createElement(ExplorerCards, {
    nftList: nftList,
    traitTypes: traitTypes
  }) : /*#__PURE__*/React.createElement(SpinnerDotted, {
    color: "#000",
    size: 200,
    style: {
      paddingTop: '30px'
    }
  }));
};

export { ExplorerComponent };
