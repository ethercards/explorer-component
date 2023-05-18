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
  selectedCardIds,
  showCardName,
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
      handleOpenOpensea(itemId);
      return;
    }
    if (e.ctrlKey) {
      const isSelected = selectedCardIds.includes(itemId);
      if (isSelected) {
        // Item already selected, remove it from the selection
        updateSelectedIds((prevSelectedItems) =>
          prevSelectedItems.filter((id) => id !== itemId)
        );
      } else {
        // Item not selected, add it to the selection
        updateSelectedIds((prevSelectedItems) => [
          ...prevSelectedItems,
          itemId,
        ]);
      }
    } else {
      handleOpenOpensea(itemId);
    }
  };
  const handleOpenOpensea = (id) => {
    window.open(`${openseaUrl}/${tokenAddres}/${id}`);
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
        />
      );
    });
  };
  return (
    <>
      <div style={{ width: '100%' }}>
        <InfiniteScroll
          dataLength={cards.length}
          height={componentHeight || '100vh'}
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
          scrollThreshold="1200px"
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
      </div>
    </>
  );
};

export default ExplorerCards;
