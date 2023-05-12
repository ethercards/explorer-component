import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { loadNext } from '../InfiniteScrollHelpers';
import './ExplorerComponent.css';
import ExplorerCard from './ExplorerCard';

const ExplorerCards = ({ nftList, meta, traitTypes, height }) => {
  const ITEMS_PER_PAGE = 29;
  const [cards, setCards] = useState([]);
  const [currentPage, _setCurrentPage] = useState(0);
  const currentPageRef = useRef(currentPage);
  const setCurrentPage = (val) => {
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
      return <ExplorerCard meta={meta} traitTypes={traitTypes} />;
    });
  };
  return (
    <>
      <div></div>
      <div>
        <InfiniteScroll
          dataLength={cards.length}
          height={height || '100vh'}
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
          // scrollThreshold="200px"
          // scrollableTarget="content-container"
          // initialScrollY={1000}
          loader={<h4>Loading...</h4>}
        >
          <div className={`row small-gutters px-0 mx-0 `}>{renderCards()}</div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ExplorerCards;
