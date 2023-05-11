export const loadNext = (nfts,ITEMS_PER_PAGE,currentPageRef,setCurrentPage,setCards) => {
    let c = [];
    let end = nfts.length < ITEMS_PER_PAGE ? nfts.length : ITEMS_PER_PAGE;
    for (let i = 0; i < end; i++) {
      if (currentPageRef.current * ITEMS_PER_PAGE + i < nfts.length) {
        c.push(nfts[currentPageRef.current * ITEMS_PER_PAGE + i]);
      }
    }
    setCards((cards) => cards.concat(c));
    setCurrentPage(currentPageRef.current + 1);
  };