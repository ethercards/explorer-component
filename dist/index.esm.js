import React, { useState, useEffect, useRef, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { SpinnerCircular, SpinnerDotted } from 'spinners-react';
import { ethers, Contract as Contract$1 } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { Zoom } from 'zoom-next';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
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

var img = "data:image/svg+xml,%3csvg clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 42 42' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill-rule='nonzero'%3e%3cpath d='m8.576 19.57v-.001c0-.96.79-1.75 1.75-1.75h.009l2.914.008h.001c.96 0 1.75.79 1.75 1.75v.001 11.019c.328-.1.749-.2 1.213-.312.659-.154 1.128-.747 1.128-1.423v-13.654-.001c0-.96.79-1.75 1.75-1.75h2.924c.96 0 1.75.79 1.75 1.75v.001 12.673s.733-.295 1.44-.6c.54-.228.893-.761.893-1.347v-15.097-.001c0-.96.789-1.749 1.749-1.75h2.915c.96 0 1.75.79 1.75 1.75v.001 12.446c2.682-1.878 5.082-4.129 7.128-6.686.598-.782.765-1.814.446-2.745-2.874-8.267-10.714-13.842-19.466-13.842-11.306 0-20.609 9.303-20.609 20.609 0 3.596.941 7.131 2.73 10.251.506.875 1.478 1.379 2.484 1.288.556-.051 1.238-.118 2.055-.211.732-.085 1.289-.713 1.288-1.45l.008-10.93' fill='%2321325b'/%3e%3cpath d='m8.517 37.227c3.523 2.567 7.772 3.951 12.131 3.951 11.301 0 20.6-9.299 20.6-20.6 0-.006 0-.011 0-.016 0-.472-.025-.943-.051-1.415-7.528 11.233-21.439 16.488-32.681 18.079' fill='%23979695'/%3e%3cpath d='m41.223 20.589c0 11.295-9.294 20.589-20.589 20.589s-20.589-9.294-20.589-20.589 9.294-20.589 20.589-20.589h.001c11.294.002 20.586 9.295 20.588 20.589z' fill='%232081e2'/%3e%3cg fill='white'%3e%3cpath d='m10.218 21.288.084-.126 5.356-8.362c.084-.126.244-.126.328.042.909 2.021 1.65 4.488 1.314 6.054-.243.817-.603 1.594-1.069 2.307-.044.121-.112.233-.2.328-.041.052-.102.083-.168.084h-5.516c-.094-.029-.159-.117-.159-.215 0-.039.01-.078.03-.112z'/%3e%3cpath d='m34.057 22.853v1.314c0 .084-.042.126-.126.168-.928.354-1.762.919-2.434 1.65-1.524 2.1-2.678 5.1-5.229 5.1h-10.736c-3.778-.011-6.88-3.122-6.88-6.9 0-.007 0-.015 0-.022v-.126c.006-.09.078-.162.168-.168h6.054c.107.008.192.093.2.2-.033.395.036.793.2 1.154.359.714 1.096 1.163 1.895 1.154h2.964v-2.307h-2.922c-.003 0-.006 0-.01 0-.102 0-.187-.084-.187-.187 0-.035.01-.069.029-.099.052-.048.095-.105.126-.168.286-.413.657-.985 1.069-1.684.289-.472.537-.968.741-1.482.048-.092.09-.188.126-.286.042-.168.126-.328.168-.455s.084-.244.126-.371c.087-.447.129-.901.126-1.356.006-.192-.008-.384-.042-.573 0-.2-.042-.413-.042-.615-.007-.182-.036-.363-.084-.539-.036-.279-.092-.554-.168-.825l-.042-.084c-.037-.185-.093-.366-.168-.539-.168-.573-.37-1.154-.573-1.65-.084-.2-.168-.413-.244-.615-.126-.286-.244-.573-.37-.825-.042-.126-.126-.2-.168-.328s-.126-.244-.168-.371c-.042-.084-.084-.168-.126-.244l-.37-.657c-.042-.084.042-.2.126-.168l2.265.615.286.084.328.084.126.042v-1.339c-.005-.643.511-1.18 1.154-1.2.307-.002.603.115.825.328.214.221.332.518.328.825v1.979l.244.084h.001c.023 0 .041.018.041.041v.001c.074.075.156.142.244.2.086.092.182.174.286.244.2.168.5.413.783.657.084.084.168.126.2.2.421.378.822.779 1.2 1.2.126.126.2.244.328.371s.2.286.328.413c.126.168.286.371.413.539.063.091.119.186.168.286.168.244.286.5.455.741.042.126.126.244.168.371.172.319.283.667.328 1.027.029.063.044.131.042.2.037.105.052.217.042.328.028.357.014.716-.042 1.069-.042.168-.084.286-.126.455-.044.156-.1.308-.168.455-.137.297-.289.586-.455.867-.042.084-.126.2-.2.328-.084.097-.152.208-.2.328-.084.126-.2.244-.286.371-.085.132-.18.256-.286.371-.126.168-.286.328-.413.5-.191.191-.382.382-.573.573-.113.121-.237.231-.371.328l-.244.2c-.034.032-.08.048-.126.042h-1.81v2.307h2.265c.498.004.98-.174 1.356-.5.126-.126.7-.615 1.4-1.356.042-.042.042-.042.084-.042l6.257-1.81c.242-.105.326-.029.326.097z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

const ExplorerCard = _ref => {
  let {
    meta,
    traitTypes,
    key,
    keyForChild,
    handleClick,
    serverUrl,
    selectedItems = [],
    handleOpenOpensea,
    showCardName
  } = _ref;
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTraits, setShowTraits] = useState(false);
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
      src: serverUrl + trait_type.icon_white
    });
    // GALAXIS_BASE_URL + traitType.icon_white;
  };

  const Card = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card",
      onClick: e => handleClick(e, meta.id),
      style: {
        border: selectedItems.includes(meta.id) ? '2px solid black' : '2px solid transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-img-trait"
    }, /*#__PURE__*/React.createElement("img", {
      src: metadata.image,
      style: {
        maxWidth: '100%'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-traits"
    }, metadata.traits && metadata.traits.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: `${showTraits ? 'explorer-simple-card-shown' : 'explorer-simple-card-hided'}`
    }, metadata.traits.map((trait, index) => {
      return trait.icon_url ? /*#__PURE__*/React.createElement("div", {
        className: "explorer-simple-card-trait-div"
      }, /*#__PURE__*/React.createElement("img", {
        className: "explorer-simple-card-trait",
        src: trait.icon_url,
        key: index
      }), /*#__PURE__*/React.createElement("div", {
        className: "explorer-simple-card-trait-name"
      }, trait.name)) : /*#__PURE__*/React.createElement(GetTraitImage, {
        traitType: trait.type,
        key: index
      });
    })), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-trait-toggler",
      onClick: () => setShowTraits(!showTraits)
    }, metadata.traits.length)))), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-trait-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-token-name"
    }, showCardName ? metadata.name : '#' + meta.id), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-opensea-etherscan"
    }, /*#__PURE__*/React.createElement("img", {
      src: img,
      style: {
        maxHeight: '30px'
      },
      onClick: () => handleOpenOpensea(meta.id)
    }))));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-lg-3 col-md-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer-image-preview"
  }, !loading ? Card() : /*#__PURE__*/React.createElement(SpinnerCircular, {
    color: "#000"
  }))));
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

var css_248z = ".layer-image-preview {\r\n  padding-bottom: 20px;\r\n  text-align: center;\r\n}\r\n.infinite-scroll-component__outerdiv {\r\n  max-width: 1200px;\r\n  margin: 0 auto;\r\n}\r\n.infinite-scroll-component {\r\n  overflow-x: hidden !important;\r\n}\r\n.infinite-scroll-component::-webkit-scrollbar {\r\n  width: 0;\r\n}\r\n.explorer-simple-card-trait-div {\r\n  padding-right: 5px;\r\n  display: flex;\r\n  margin: 10px 0;\r\n  /* position: relative; */\r\n}\r\n.explorer-simple-card-trait-name {\r\n  background-color: #000;\r\n  padding: 5px 10px;\r\n  border-radius: 5px;\r\n  margin-left: 10px;\r\n}\r\n.explorer-simple-card-trait-div:hover .explorer-simple-card-trait-name {\r\n  display: block;\r\n  cursor: pointer;\r\n}\r\n/* .explorer-simple-card-trait-name {\r\n  display: none;\r\n  background-color: #6d6c6c;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  white-space: nowrap;\r\n  z-index: 22222222222;\r\n  padding: 10px 0;\r\n  border-radius: 5px;\r\n  width: 100%;\r\n  text-align: center;\r\n  height: 100%;\r\n  line-height: 15px;\r\n} */\r\n.explorer-simple-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  text-align: left;\r\n  border-radius: 10px;\r\n  overflow: hidden;\r\n  color: #fff;\r\n  cursor: pointer;\r\n}\r\n.explorer-simple-card-trait-container {\r\n  padding: 10px;\r\n  background: linear-gradient(rgb(20, 33, 46), rgb(14, 25, 36));\r\n}\r\n.explorer-simple-card-trait {\r\n  max-width: 30px;\r\n}\r\n.explorer-simple-card-img-trait {\r\n  position: relative;\r\n  display: flex;\r\n\r\n  z-index: 333333333;\r\n}\r\n.explorer-simple-card-trait-toggler {\r\n  background-color: #000;\r\n  padding: 10px 15px;\r\n  color: red;\r\n  max-width: 40px;\r\n  border-radius: 5px;\r\n}\r\n.explorer-simple-card-shown {\r\n  opacity: 1;\r\n  transition: all 0.3s;\r\n}\r\n.explorer-simple-card-hided {\r\n  opacity: 0;\r\n  transition: all 0.3s;\r\n}\r\n.explorer-simple-card-opensea-etherscan {\r\n  padding-top: 10px;\r\n  display: flex;\r\n}\r\n.explorer-simple-card-traits {\r\n  position: absolute;\r\n  bottom: 10px;\r\n  left: 10px;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  flex-direction: column;\r\n  margin-top: 10px;\r\n  min-height: 30px;\r\n}\r\n.dust-pool-root {\r\n  max-width: 1140px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n  margin-top: 30px;\r\n  font-family: poppins;\r\n}\r\n.dust-pool-textbox {\r\n  text-align: center;\r\n  max-width: 600px;\r\n  margin: 0 auto;\r\n}\r\n.pool-subtitle {\r\n  font-size: 30px;\r\n  font-weight: 600;\r\n}\r\n.tab-choose {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-bottom: 30px;\r\n  text-transform: uppercase;\r\n}\r\n.tab-choose div {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  padding: 12px 15px;\r\n}\r\n.tab-choose div:hover {\r\n  cursor: pointer;\r\n}\r\n.tab-choose .active-tab {\r\n  background-color: #000;\r\n  color: #fff;\r\n}\r\n.tab-choose div:first-child {\r\n  border: 2px solid #000;\r\n  border-top-left-radius: 10px;\r\n  border-bottom-left-radius: 10px;\r\n}\r\n.tab-choose div:nth-child(2) {\r\n  border-top: 2px solid #000;\r\n  border-bottom: 2px solid #000;\r\n}\r\n.tab-choose div:nth-child(3) {\r\n  border: 2px solid #000;\r\n  border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px;\r\n}\r\n/*classes from bootstrap*/\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n.container {\r\n  width: 100%;\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n.mt-5,\r\n.my-5 {\r\n  margin-top: 3rem !important;\r\n}\r\n.row {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  margin-right: -15px;\r\n  margin-left: -15px;\r\n}\r\n.col-12 {\r\n  flex: 0 0 100%;\r\n  max-width: 100%;\r\n}\r\n.col-12,\r\n.col-lg-6,\r\n.col-lg-3,\r\n.col-md-6 {\r\n  position: relative;\r\n  width: 100%;\r\n  min-height: 1px;\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n.col-6 {\r\n  flex: 0 0 50%;\r\n  max-width: 50%;\r\n}\r\n.mb-1 {\r\n  margin-bottom: 0.25rem !important;\r\n}\r\n.mb-2 {\r\n  margin-bottom: 0.5rem !important;\r\n}\r\n.mb-3 {\r\n  margin-bottom: 0.75rem !important;\r\n}\r\n.mt-2 {\r\n  margin-top: 0.5rem !important;\r\n}\r\n.pb-4 {\r\n  padding-bottom: 1.5rem !important;\r\n}\r\n.w-100 {\r\n  width: 100% !important;\r\n}\r\n.text-right {\r\n  text-align: right !important;\r\n}\r\n.dust-pool-card p {\r\n  margin-block-start: 0;\r\n}\r\n.section-divider-img {\r\n  max-height: 35px;\r\n  z-index: 2;\r\n}\r\n@media only screen and (max-width: 500px) {\r\n  .section-divider-img {\r\n    max-height: 25px;\r\n    z-index: 2;\r\n  }\r\n}\r\n@media (min-width: 576px) {\r\n  .container {\r\n    max-width: 540px;\r\n  }\r\n}\r\n@media (max-width: 600px) {\r\n  .dust-pool-card .dust-pool-btn {\r\n    position: unset !important;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .container {\r\n    max-width: 720px;\r\n  }\r\n}\r\n.col-md-6 {\r\n  flex: 0 0 50%;\r\n  max-width: 50%;\r\n}\r\n@media (min-width: 992px) {\r\n  .container {\r\n    max-width: 960px;\r\n  }\r\n  .col-lg-6 {\r\n    flex: 0 0 50%;\r\n    max-width: 50%;\r\n  }\r\n  .col-lg-3 {\r\n    flex: 0 0 25%;\r\n    max-width: 25%;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .container {\r\n    max-width: 1140px;\r\n  }\r\n}\r\n@media (max-width: 1000px) {\r\n  .col-lg-3 {\r\n    flex: 0 0 50%;\r\n    max-width: 50%;\r\n  }\r\n}\r\n@media (max-width: 650px) {\r\n  .col-lg-3 {\r\n    flex: 0 0 100%;\r\n    max-width: 100%;\r\n  }\r\n}\r\n@media only screen and (max-width: 945px) {\r\n  .dust-pool-root {\r\n    max-width: 100%;\r\n  }\r\n}\r\n";
styleInject(css_248z);

const ExplorerCards = _ref => {
  let {
    nftList,
    traitTypes,
    height,
    tokenAddres,
    openseaUrl,
    etherScanUrl,
    componentHeight,
    serverUrl,
    isAdmin,
    updateSelectedIds,
    selectedCardIds = [],
    showCardName
  } = _ref;
  const ITEMS_PER_PAGE = 29;
  const [cards, setCards] = useState([]);
  const [currentPage, _setCurrentPage] = useState(0);
  const currentPageRef = useRef(currentPage);
  const setCurrentPage = val => {
    currentPageRef.current = val;
    _setCurrentPage(val);
  };
  const handleClick = (e, itemId) => {
    if (!isAdmin) {
      // handleOpenOpensea(itemId);
      return;
    }
    if (e.ctrlKey) {
      const isSelected = selectedCardIds.includes(itemId);
      if (isSelected) {
        if (updateSelectedIds) {
          updateSelectedIds(prevSelectedItems => prevSelectedItems.filter(id => id !== itemId));
        }
      } else {
        if (updateSelectedIds) {
          updateSelectedIds(prevSelectedItems => [...prevSelectedItems, itemId]);
        }
      }
    }
  };
  const handleOpenOpensea = id => {
    window.open(`${openseaUrl}/${tokenAddres}/${id}`);
  };
  useEffect(() => {
    setCards([]);
    setCurrentPage(0);
    loadNext(nftList, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards);
  }, [nftList]);
  const renderCards = () => {
    return cards.map((meta, i) => {
      return /*#__PURE__*/React.createElement(ExplorerCard, {
        onKeyDown: e => keyboardEventHandler(e.key),
        meta: meta,
        traitTypes: traitTypes,
        key: i,
        keyForChild: i,
        handleClick: handleClick,
        serverUrl: serverUrl,
        selectedItems: selectedCardIds,
        showCardName: showCardName,
        handleOpenOpensea: handleOpenOpensea
      });
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(InfiniteScroll, {
    dataLength: cards.length,
    height: componentHeight || '100vh',
    next: () => loadNext(nftList, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards),
    pullDownToRefreshThreshold: 500,
    hasMore: currentPageRef.current * ITEMS_PER_PAGE < nftList.length,
    scrollThreshold: "1200px"
    // scrollableTarget="content-container"
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
const GALAXIS_REGISTRY = '0x1e8150050A7a4715aad42b905C08df76883f396F';

// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

// account is optional
function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
const getProvider = rpcUrl => {
  return new ethers.providers.JsonRpcProvider(rpcUrl);
};
function useZoom2Contract(chainId) {
  return getContract(ZOOM_2_ADDRESSES[chainId], abi$2, false);
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

var useGetNftsList = function useGetNftsList(chainId, contractAddres, address, rpcUrl) {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    zoomContract = _useState2[0],
    setZoomContract = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    nftList = _useState4[0],
    setNftList = _useState4[1];
  var provider = useMemo(function () {
    return getProvider(rpcUrl);
  }, [rpcUrl]); //provider
  var tokenContract = useMemo(function () {
    return new Contract$1(contractAddres, tokenABI.abi, provider);
  }, [contractAddres, provider]);
  var fetchedRef = useRef(false);
  var createZoomcontract = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var galaxisRegistry, zoomAddress, contract;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!provider) {
                _context.next = 7;
                break;
              }
              galaxisRegistry = getContract(GALAXIS_REGISTRY, GalaxisRegistry.abi, provider, false);
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
                } else {
                  zoomAddress = useZoom2Contract(chainId);
                  setZoomContract(zoomAddress);
                }
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function createZoomcontract() {
      return _ref.apply(this, arguments);
    };
  }();
  var getNftList = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
                fetchedRef.current = true;
              }).catch(function (e) {
                console.log(e);
                fetchedRef.current = true;
              });
            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function getNftList() {
      return _ref2.apply(this, arguments);
    };
  }();
  useEffect(function () {
    createZoomcontract();
  }, [chainId, rpcUrl]);
  useEffect(function () {
    if (fetchedRef.current === false) {
      getNftList();
    }
  }, [zoomContract, tokenContract, fetchedRef.current, address]);
  return {
    nftList: nftList
  };
};

var ExplorerComponent = function ExplorerComponent(_ref) {
  var tokenAddres = _ref.tokenAddres,
    poolAddress = _ref.poolAddress,
    chainId = _ref.chainId,
    rpcUrl = _ref.rpcUrl,
    openseaUrl = _ref.openseaUrl,
    etherScanUrl = _ref.etherScanUrl,
    componentHeight = _ref.componentHeight,
    serverUrl = _ref.serverUrl,
    isAdmin = _ref.isAdmin,
    updateSelectedIds = _ref.updateSelectedIds,
    selectedCardIds = _ref.selectedCardIds,
    showCardName = _ref.showCardName;
  var _useGetNftsList = useGetNftsList(chainId, tokenAddres, poolAddress, rpcUrl),
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, nftList ? /*#__PURE__*/React.createElement(React.Fragment, null, nftList.length > 0 ? /*#__PURE__*/React.createElement(ExplorerCards, {
    nftList: nftList,
    traitTypes: traitTypes,
    tokenAddres: tokenAddres,
    openseaUrl: openseaUrl,
    etherScanUrl: etherScanUrl,
    componentHeight: componentHeight,
    serverUrl: serverUrl,
    isAdmin: isAdmin,
    updateSelectedIds: updateSelectedIds,
    selectedCardIds: selectedCardIds,
    showCardName: showCardName
  }) : /*#__PURE__*/React.createElement("p", null, "Empty pool")) : /*#__PURE__*/React.createElement(SpinnerDotted, {
    color: "#000",
    size: 200,
    style: {
      paddingTop: '30px'
    }
  }));
};

export { ExplorerComponent };
