import React, { useState, useRef, useEffect } from 'react';
import { GalaxisCard } from 'galaxis-components';
import InfiniteScroll from 'react-infinite-scroll-component';

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

var loadNext = function loadNext(nfts, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards) {
  var c = [];
  var end = nfts.length < ITEMS_PER_PAGE ? nfts.length : ITEMS_PER_PAGE;

  for (var i = 0; i < end; i++) {
    if (currentPageRef.current * ITEMS_PER_PAGE + i < nfts.length) {
      c.push(nfts[currentPageRef.current * ITEMS_PER_PAGE + i]);
    }
  }

  setCards(function (cards) {
    return cards.concat(c);
  });
  setCurrentPage(currentPageRef.current + 1);
};

var ExplorerCards = function ExplorerCards(_ref) {
  var nfts = _ref.nfts,
      meta = _ref.meta;
  var ITEMS_PER_PAGE = 29;

  var _useState = useState([1, 2, 3, 4, 5, 6]),
      _useState2 = _slicedToArray(_useState, 2),
      cards = _useState2[0],
      setCards = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      currentPage = _useState4[0],
      _setCurrentPage = _useState4[1];

  var currentPageRef = useRef(currentPage);

  var setCurrentPage = function setCurrentPage(val) {
    currentPageRef.current = val;

    _setCurrentPage(val);
  };

  useEffect(function () {
    setCards([]);
    setCurrentPage(0);
    loadNext(nfts, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards);
  }, [nfts]);

  var renderCards = function renderCards() {
    return cards.map(function (card, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "col-lg-3 col-md-4 mb-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "layer-image-preview"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GalaxisCard, {
        metadata: meta
      }))));
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: '200px'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfiniteScroll, {
    dataLength: cards.length,
    next: function next() {
      return loadNext(nfts, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards);
    },
    pullDownToRefreshThreshold: 500,
    hasMore: currentPageRef.current * ITEMS_PER_PAGE < nfts.length // scrollThreshold="200px"
    // scrollableTarget="content-container"
    // initialScrollY={1000}
    ,
    loader: /*#__PURE__*/React.createElement("h4", null, "Loading...")
  }, /*#__PURE__*/React.createElement("div", {
    className: "row small-gutters px-0 mx-0"
  }, renderCards()))));
};

var meta = {
  tokenId: 200,
  image: 'https://ether-cards.mypinata.cloud/ipfs/QmVwHf3BGbw6Cdz27AZVfXB29La4QGUL1K4zL5NuHJKtGe/81/2081.jpeg',
  name: 'The Hedgie Fund #200',
  collection_type: 'galaxis',
  animation_url: 'https://explorer.galaxis.xyz/#/render?hedgiefund-metadata-server.herokuapp.com/api/metadata/81/2081',
  sides: [{
    id: 1,
    dna: '1637050516140514'
  }],
  collection_name: 'The Hedgie Fund',
  attributes: [{
    value: "Sam's room #2",
    trait_type: 'Background'
  }, {
    value: 'Combed Yellow',
    trait_type: 'Prickles'
  }, {
    value: 'Plain',
    trait_type: 'Body'
  }, {
    value: 'Up',
    trait_type: 'Ears'
  }, {
    value: 'Laugh 2',
    trait_type: 'Face'
  }, {
    value: 'Policeman Hat',
    trait_type: 'Hat'
  }, {
    value: 'NONE',
    trait_type: 'Birthmarks'
  }, {
    value: 'Arms Folded',
    trait_type: 'Arms'
  }, {
    trait_type: 'Utility trait',
    value: 'Background'
  }, {
    trait_type: 'Utility trait',
    value: 'Face'
  }, {
    trait_type: 'Utility trait',
    value: 'Hat'
  }, {
    trait_type: 'Utility trait',
    value: 'Arms'
  }],
  traits: [{
    id: 1,
    name: 'Background',
    type: '7',
    description: "People with autism like their own space, and bedrooms are often a 'safe space'."
  }, {
    id: 41,
    name: 'Face',
    type: '7',
    description: 'Sam is happiest with his family.'
  }, {
    id: 61,
    name: 'Hat',
    type: '7',
    description: 'Sam can lose himself in his imaginary world for hours on end.'
  }, {
    id: 77,
    name: 'Arms',
    type: '7',
    description: "Sam folds his arms to show that he is not happy. He may be semi-verbal but this doesn't mean he can't communicate!"
  }]
};

var ExplorerComponent = function ExplorerComponent() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ExplorerCards, {
    nfts: [1, 2, 3, 4, 5, 6],
    meta: meta
  }));
};

export { ExplorerComponent };
