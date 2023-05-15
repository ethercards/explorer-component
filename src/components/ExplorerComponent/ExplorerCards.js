import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { loadNext } from '../InfiniteScrollHelpers';
import './ExplorerComponent.css';
import ExplorerCard from './ExplorerCard';

const ExplorerCards = ({ nftList, traitTypes, height }) => {
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
      return (
        <ExplorerCard
          meta={meta}
          traitTypes={traitTypes}
          key={i}
          keyForChild={i}
        />
      );
    });
  };
  return (
    <>
      <div style={{ width: '100%' }}>
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
