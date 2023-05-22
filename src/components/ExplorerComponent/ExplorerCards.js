import React, { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { loadNext } from '../InfiniteScrollHelpers';
import ExplorerCard from './ExplorerCard';
import './ExplorerComponent.css';

const ExplorerCards = ({
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
  showCardName,
  etherscanUrl,
  columns,
  styleClass,
}) => {
  const ITEMS_PER_PAGE = 29;
  const [cards, setCards] = useState([]);
  const [currentPage, _setCurrentPage] = useState(0);
  const currentPageRef = useRef(currentPage);
  const setCurrentPage = (val) => {
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
          updateSelectedIds((prevSelectedItems) =>
            prevSelectedItems.filter((id) => id !== itemId)
          );
        }
      } else {
        if (updateSelectedIds) {
          updateSelectedIds((prevSelectedItems) => [
            ...prevSelectedItems,
            itemId,
          ]);
        }
      }
    }
  };
  const handleOpenOpensea = (id) => {
    window.open(`${openseaUrl}/${tokenAddres}/${id}`);
  };
  const handleEtherscan = () => {
    window.open(etherscanUrl);
  };

  useEffect(() => {
    setCards([]);
    setCurrentPage(0);
    loadNext(nftList, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards);
  }, [nftList]);

  const renderCards = () => {
    return cards.map((meta, i) => {
      return (
        <ExplorerCard
          onKeyDown={(e) => keyboardEventHandler(e.key)}
          meta={meta}
          traitTypes={traitTypes}
          key={i}
          keyForChild={i}
          handleClick={handleClick}
          serverUrl={serverUrl}
          selectedItems={selectedCardIds}
          showCardName={showCardName}
          handleOpenOpensea={handleOpenOpensea}
          handleEtherscan={handleEtherscan}
          columns={columns}
        />
      );
    });
  };
  return (
    <>
      <InfiniteScroll
        dataLength={cards.length}
        className={styleClass}
        next={() =>
          loadNext(
            nftList,
            ITEMS_PER_PAGE,
            currentPageRef,
            setCurrentPage,
            setCards
          )
        }
        pullDownToRefreshThreshold={500}
        hasMore={currentPageRef.current * ITEMS_PER_PAGE < nftList.length}
        // scrollableTarget="content-container"
        // initialScrollY={1000}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
      >
        <div
          className={`row small-gutters px-2 mx-0  `}
          style={{ padding: '10px' }}
        >
          {renderCards()}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default ExplorerCards;
