import React from 'react';
import { GalaxisCard } from 'galaxis-components';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { loadNext } from '../InfiniteScrollHelpers';
import './ExplorerComponent.css';

const ExplorerCards = ({ nfts, meta, traitTypes }) => {
  const ITEMS_PER_PAGE = 29;
  const [cards, setCards] = useState([
    1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1,
    2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2,
    3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
  ]);
  const [currentPage, _setCurrentPage] = useState(0);
  const currentPageRef = useRef(currentPage);
  const setCurrentPage = (val) => {
    currentPageRef.current = val;
    _setCurrentPage(val);
  };
  useEffect(() => {
    setCards([]);
    setCurrentPage(0);
    loadNext(nfts, ITEMS_PER_PAGE, currentPageRef, setCurrentPage, setCards);
  }, [nfts]);
  const renderCards = () => {
    return cards.map((card, i) => {
      return (
        <div key={i} className="col-lg-3 col-md-4 mb-4">
          <div className="layer-image-preview">
            <GalaxisCard metadata={meta} traitTypes={traitTypes} />
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div></div>
      <div>
        <InfiniteScroll
          dataLength={cards.length}
          next={() =>
            loadNext(
              nfts,
              ITEMS_PER_PAGE,
              currentPageRef,
              setCurrentPage,
              setCards
            )
          }
          pullDownToRefreshThreshold={500}
          hasMore={currentPageRef.current * ITEMS_PER_PAGE < nfts.length}
          // scrollThreshold="200px"
          // scrollableTarget="content-container"
          // initialScrollY={1000}
          loader={<h4>Loading...</h4>}
        >
          <div className={`row small-gutters px-0 mx-0`}>{renderCards()}</div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ExplorerCards;
