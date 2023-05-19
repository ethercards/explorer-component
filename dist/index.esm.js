import React, { useState, useEffect, useRef, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { SpinnerCircular, SpinnerDotted } from 'spinners-react';
import { ethers, Contract as Contract$1 } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { Zoom } from 'zoom-next';

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

var img$2 = "data:image/svg+xml,%3csvg clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 42 42' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill-rule='nonzero'%3e%3cpath d='m8.576 19.57v-.001c0-.96.79-1.75 1.75-1.75h.009l2.914.008h.001c.96 0 1.75.79 1.75 1.75v.001 11.019c.328-.1.749-.2 1.213-.312.659-.154 1.128-.747 1.128-1.423v-13.654-.001c0-.96.79-1.75 1.75-1.75h2.924c.96 0 1.75.79 1.75 1.75v.001 12.673s.733-.295 1.44-.6c.54-.228.893-.761.893-1.347v-15.097-.001c0-.96.789-1.749 1.749-1.75h2.915c.96 0 1.75.79 1.75 1.75v.001 12.446c2.682-1.878 5.082-4.129 7.128-6.686.598-.782.765-1.814.446-2.745-2.874-8.267-10.714-13.842-19.466-13.842-11.306 0-20.609 9.303-20.609 20.609 0 3.596.941 7.131 2.73 10.251.506.875 1.478 1.379 2.484 1.288.556-.051 1.238-.118 2.055-.211.732-.085 1.289-.713 1.288-1.45l.008-10.93' fill='%2321325b'/%3e%3cpath d='m8.517 37.227c3.523 2.567 7.772 3.951 12.131 3.951 11.301 0 20.6-9.299 20.6-20.6 0-.006 0-.011 0-.016 0-.472-.025-.943-.051-1.415-7.528 11.233-21.439 16.488-32.681 18.079' fill='%23979695'/%3e%3cpath d='m41.223 20.589c0 11.295-9.294 20.589-20.589 20.589s-20.589-9.294-20.589-20.589 9.294-20.589 20.589-20.589h.001c11.294.002 20.586 9.295 20.588 20.589z' fill='%232081e2'/%3e%3cg fill='white'%3e%3cpath d='m10.218 21.288.084-.126 5.356-8.362c.084-.126.244-.126.328.042.909 2.021 1.65 4.488 1.314 6.054-.243.817-.603 1.594-1.069 2.307-.044.121-.112.233-.2.328-.041.052-.102.083-.168.084h-5.516c-.094-.029-.159-.117-.159-.215 0-.039.01-.078.03-.112z'/%3e%3cpath d='m34.057 22.853v1.314c0 .084-.042.126-.126.168-.928.354-1.762.919-2.434 1.65-1.524 2.1-2.678 5.1-5.229 5.1h-10.736c-3.778-.011-6.88-3.122-6.88-6.9 0-.007 0-.015 0-.022v-.126c.006-.09.078-.162.168-.168h6.054c.107.008.192.093.2.2-.033.395.036.793.2 1.154.359.714 1.096 1.163 1.895 1.154h2.964v-2.307h-2.922c-.003 0-.006 0-.01 0-.102 0-.187-.084-.187-.187 0-.035.01-.069.029-.099.052-.048.095-.105.126-.168.286-.413.657-.985 1.069-1.684.289-.472.537-.968.741-1.482.048-.092.09-.188.126-.286.042-.168.126-.328.168-.455s.084-.244.126-.371c.087-.447.129-.901.126-1.356.006-.192-.008-.384-.042-.573 0-.2-.042-.413-.042-.615-.007-.182-.036-.363-.084-.539-.036-.279-.092-.554-.168-.825l-.042-.084c-.037-.185-.093-.366-.168-.539-.168-.573-.37-1.154-.573-1.65-.084-.2-.168-.413-.244-.615-.126-.286-.244-.573-.37-.825-.042-.126-.126-.2-.168-.328s-.126-.244-.168-.371c-.042-.084-.084-.168-.126-.244l-.37-.657c-.042-.084.042-.2.126-.168l2.265.615.286.084.328.084.126.042v-1.339c-.005-.643.511-1.18 1.154-1.2.307-.002.603.115.825.328.214.221.332.518.328.825v1.979l.244.084h.001c.023 0 .041.018.041.041v.001c.074.075.156.142.244.2.086.092.182.174.286.244.2.168.5.413.783.657.084.084.168.126.2.2.421.378.822.779 1.2 1.2.126.126.2.244.328.371s.2.286.328.413c.126.168.286.371.413.539.063.091.119.186.168.286.168.244.286.5.455.741.042.126.126.244.168.371.172.319.283.667.328 1.027.029.063.044.131.042.2.037.105.052.217.042.328.028.357.014.716-.042 1.069-.042.168-.084.286-.126.455-.044.156-.1.308-.168.455-.137.297-.289.586-.455.867-.042.084-.126.2-.2.328-.084.097-.152.208-.2.328-.084.126-.2.244-.286.371-.085.132-.18.256-.286.371-.126.168-.286.328-.413.5-.191.191-.382.382-.573.573-.113.121-.237.231-.371.328l-.244.2c-.034.032-.08.048-.126.042h-1.81v2.307h2.265c.498.004.98-.174 1.356-.5.126-.126.7-.615 1.4-1.356.042-.042.042-.042.084-.042l6.257-1.81c.242-.105.326-.029.326.097z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='41.756' height='41.177' viewBox='0 0 41.756 41.177'%3e %3cg id='Group_1482' data-name='Group 1482' transform='translate(-288 -1871)'%3e %3cellipse id='Ellipse_1' data-name='Ellipse 1' cx='20.878' cy='20.469' rx='20.878' ry='20.469' transform='translate(288 1871.24)' fill='white'/%3e %3cg id='etherscan-seeklogo.com' transform='translate(288.125 1871)'%3e %3cpath id='Path_138' data-name='Path 138' d='M13.529%2c25.573a1.75%2c1.75%2c0%2c0%2c1%2c1.752-1.752h.008l2.914.008a1.75%2c1.75%2c0%2c0%2c1%2c1.752%2c1.751V36.6c.328-.1.749-.2%2c1.213-.312a1.461%2c1.461%2c0%2c0%2c0%2c1.128-1.423V21.211a1.75%2c1.75%2c0%2c0%2c1%2c1.752-1.752h2.922a1.75%2c1.75%2c0%2c0%2c1%2c1.751%2c1.752V33.884s.733-.295%2c1.44-.6a1.463%2c1.463%2c0%2c0%2c0%2c.893-1.347V16.84A1.75%2c1.75%2c0%2c0%2c1%2c32.8%2c15.089h2.914a1.75%2c1.75%2c0%2c0%2c1%2c1.751%2c1.752V29.286A34.4%2c34.4%2c0%2c0%2c0%2c44.593%2c22.6a2.946%2c2.946%2c0%2c0%2c0%2c.446-2.745A20.609%2c20.609%2c0%2c1%2c0%2c7.694%2c36.873a2.6%2c2.6%2c0%2c0%2c0%2c2.484%2c1.288c.556-.051%2c1.238-.118%2c2.055-.211A1.458%2c1.458%2c0%2c0%2c0%2c13.521%2c36.5l.008-10.93' transform='translate(-4.953 -6.003)' fill='%2321325b'/%3e %3cpath id='Path_139' data-name='Path 139' d='M106.1%2c251.479a20.6%2c20.6%2c0%2c0%2c0%2c32.731-16.665c0-.472-.025-.943-.051-1.415-7.528%2c11.233-21.439%2c16.488-32.681%2c18.079' transform='translate(-97.583 -214.252)' fill='%23979695'/%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!-- Generator: Adobe Illustrator 27.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='725 290 450 500' style='enable-background:new 0 0 1920 1080%3b' xml:space='preserve'%3e%3cg%3e %3cpath d='M962.25%2c348c2.6%2c2.73%2c5.71%2c5.14%2c7.73%2c8.25c14.24%2c21.87%2c28.26%2c43.88%2c42.34%2c65.86c0.67%2c1.05%2c1.34%2c2.12%2c1.82%2c3.26 c1.13%2c2.71%2c0.18%2c4.96-2.05%2c6.57c-2.31%2c1.66-4.77%2c1.42-6.87-0.44c-1-0.89-1.72-2.13-2.46-3.28c-7.29-11.33-14.55-22.67-22.42-33.8 c0.3%2c1.07%2c0.56%2c2.16%2c0.91%2c3.21c5.02%2c15.03%2c10.06%2c30.05%2c15.09%2c45.07c0.32%2c0.95%2c0.72%2c1.87%2c0.96%2c2.84c0.82%2c3.3-0.67%2c6.28-3.6%2c7.31 c-2.89%2c1.01-6.06-0.41-7.23-3.66c-2.24-6.22-4.24-12.52-6.34-18.79c-6.46-19.27-12.92-38.55-19.39-57.82 c-0.38-1.12-0.84-2.21-1.64-4.29c-16.13%2c48.19-31.94%2c95.42-47.85%2c142.93c32.03%2c0%2c63.71%2c0%2c95.75%2c0c-0.52-1.77-0.98-3.51-1.55-5.21 c-3.7-11.13-7.47-22.23-11.12-33.37c-1.1-3.38%2c0.29-6.34%2c3.14-7.43c3.1-1.18%2c6.13%2c0.25%2c7.56%2c3.61c0.34%2c0.8%2c0.57%2c1.65%2c0.85%2c2.48 c4.24%2c12.66%2c8.53%2c25.3%2c12.67%2c37.98c0.79%2c2.43%2c1.98%2c3.92%2c4.48%2c4.9c14.75%2c5.79%2c29.41%2c11.79%2c44.1%2c17.72c0.55%2c0.22%2c1.12%2c0.38%2c2.35%2c0.8 c-0.9-1.55-1.44-2.57-2.06-3.54c-7.47-11.68-14.96-23.34-22.44-35.02c-0.54-0.84-1.12-1.66-1.6-2.53 c-1.74-3.15-1.16-6.24%2c1.46-7.93c2.63-1.7%2c5.83-1.05%2c7.92%2c1.64c0.46%2c0.59%2c0.84%2c1.24%2c1.24%2c1.87c9.98%2c15.56%2c19.89%2c31.16%2c29.97%2c46.64 c3.2%2c4.91%2c3.1%2c9.31-0.08%2c14.21c-38.41%2c59.19-76.71%2c118.44-115.15%2c177.61c-1.61%2c2.48-4.33%2c4.25-6.54%2c6.35c-2%2c0-4%2c0-6%2c0 c-2.61-2.73-5.73-5.12-7.76-8.23c-25.64-39.34-51.12-78.78-76.67-118.17c-1.73-2.67-2.97-5.28-0.89-8.27 c2.26-3.24%2c5.86-3.6%2c8.65-0.81c0.96%2c0.96%2c1.67%2c2.17%2c2.41%2c3.33c19.8%2c30.62%2c39.59%2c61.26%2c59.39%2c91.88c0.46%2c0.71%2c0.97%2c1.37%2c2.07%2c1.81 c-1.89-7.27-3.77-14.55-5.68-21.81c-3.81-14.46-7.66-28.91-11.45-43.38c-1.53-5.82%2c1.17-9.75%2c6.13-9.04 c3.26%2c0.47%2c4.42%2c2.84%2c5.16%2c5.66c5.24%2c20.03%2c10.51%2c40.05%2c15.77%2c60.07c1.79%2c6.82%2c3.62%2c13.63%2c6.31%2c20.47 c15.96-60.67%2c31.91-121.34%2c47.96-182.35c-32.38%2c0-64.29%2c0-96.75%2c0c1.77%2c6.86%2c3.5%2c13.56%2c5.23%2c20.27c0.34%2c1.33%2c0.81%2c2.63%2c1.08%2c3.97 c0.75%2c3.72-1.03%2c6.8-4.31%2c7.61c-3.04%2c0.75-6.02-1.09-7.01-4.65c-2.07-7.44-3.99-14.93-5.99-22.4c-0.22-0.82-0.54-1.6-0.94-2.74 c-17.23%2c7.01-34.25%2c13.94-51.64%2c21.02c6.12%2c9.47%2c11.94%2c18.47%2c17.75%2c27.47c0.81%2c1.26%2c1.71%2c2.48%2c2.38%2c3.81 c1.47%2c2.91%2c0.7%2c6.28-1.63%2c7.66c-2.74%2c1.62-6.16%2c1.14-8.05-1.5c-2.61-3.65-4.96-7.5-7.41-11.27c-5.37-8.27-10.68-16.59-16.12-24.82 c-2.95-4.46-3.03-8.7-0.11-13.25c38.66-60.21%2c77.26-120.46%2c115.99-180.63c1.47-2.28%2c4.06-3.83%2c6.12-5.72 C958.25%2c348%2c960.25%2c348%2c962.25%2c348z M974.74%2c693.89c0.33%2c0.07%2c0.65%2c0.15%2c0.98%2c0.22c31.87-49.22%2c63.74-98.43%2c95.85-148.01 c-17.58-7.1-34.83-14.07-52.4-21.17C1004.28%2c581.58%2c989.51%2c637.73%2c974.74%2c693.89z M849.65%2c531.6c0.14%2c0.2%2c0.29%2c0.4%2c0.43%2c0.6 c15.02-6.02%2c30.02-12.08%2c45.07-18c2.42-0.95%2c3.77-2.32%2c4.61-4.82c10.69-32.19%2c21.48-64.35%2c32.23-96.53 c1.86-5.57%2c3.61-11.17%2c5.42-16.76c-0.23-0.1-0.46-0.2-0.68-0.29C907.7%2c441.07%2c878.67%2c486.33%2c849.65%2c531.6z'/%3e %3cpath d='M900.41%2c585.61c1.7-2.43%2c3.15-5.09%2c5.15-7.25c3.53-3.82%2c7.62-7.12%2c11.04-11.02c4.73-5.4%2c10.89-5.48%2c15.69-0.12 c3.47%2c3.88%2c7.21%2c7.57%2c11.13%2c11c5.65%2c4.95%2c5.33%2c11.43-0.64%2c16.12c-3.77%2c2.97-7.26%2c6.41-10.33%2c10.1c-4.78%2c5.74-11.44%2c5.68-16.13-0.09 c-2.94-3.61-6.54-6.76-10.16-9.73C903.4%2c592.34%2c901.36%2c589.96%2c900.41%2c585.61z M932%2c586.23c-2.36-2.6-5.14-5.65-7.56-8.3 c-2.66%2c2.71-5.58%2c5.68-8.46%2c8.6c2.62%2c2.48%2c5.57%2c5.26%2c8.51%2c8.04C927.21%2c591.55%2c929.93%2c588.53%2c932%2c586.23z'/%3e %3cpath d='M887.83%2c382.18c-0.97%2c1.22-1.93%2c3.57-3.51%2c4.11c-1.77%2c0.61-4.91%2c0.36-6.04-0.84c-4.25-4.53-8.1-9.48-11.73-14.54 c-1.72-2.4-0.94-5.15%2c1.43-6.98c2.36-1.82%2c5.21-1.87%2c7.15%2c0.32c4.11%2c4.67%2c7.87%2c9.67%2c11.69%2c14.59 C887.3%2c379.49%2c887.33%2c380.49%2c887.83%2c382.18z'/%3e %3cpath d='M888.17%2c697.92c-0.99%2c2.02-1.45%2c3.46-2.31%2c4.6c-3.1%2c4.06-6.3%2c8.06-9.55%2c12.01c-2.48%2c3.02-6%2c3.56-8.51%2c1.45 c-2.49-2.1-2.7-5.29-0.35-8.33c3.28-4.24%2c6.44-8.63%2c10.16-12.46c1.34-1.38%2c4.34-2.14%2c6.23-1.7 C885.51%2c693.87%2c886.7%2c696.32%2c888.17%2c697.92z'/%3e %3cpath d='M823.95%2c653.84c-2.2-1.94-4.67-3.09-5.09-4.76c-0.48-1.87%2c0.2-5.12%2c1.59-6.17c4.04-3.06%2c8.62-5.44%2c13.12-7.86 c2.4-1.29%2c5.04-0.55%2c6.23%2c1.68c0.91%2c1.71%2c1.42%2c5.32%2c0.51%2c6.04C835.3%2c646.69%2c829.79%2c649.99%2c823.95%2c653.84z'/%3e %3cpath d='M836.48%2c445.93c-1.91-0.66-2.92-0.85-3.76-1.33c-3.9-2.21-7.81-4.42-11.61-6.81c-2.98-1.88-3.71-5.05-2.06-7.75 c1.58-2.58%2c4.6-3.54%2c7.5-1.97c4.17%2c2.24%2c8.43%2c4.44%2c12.15%2c7.31c1.45%2c1.12%2c2.39%2c4.23%2c1.97%2c6.07 C840.24%2c443.26%2c837.8%2c444.6%2c836.48%2c445.93z'/%3e %3cpath d='M799.67%2c534.24c2.03%2c0.1%2c4.17%2c0.03%2c6.25%2c0.36c3.02%2c0.49%2c4.58%2c2.61%2c4.53%2c5.53c-0.05%2c2.74-1.57%2c5-4.42%2c5.2 c-4.33%2c0.31-8.71%2c0.31-13.04-0.02c-2.85-0.22-4.32-2.49-4.33-5.26c-0.01-2.95%2c1.56-5.02%2c4.59-5.47 C795.32%2c534.26%2c797.46%2c534.34%2c799.67%2c534.24z'/%3e %3cpath d='M1056.12%2c452.77c-0.7%2c3.94-2.48%2c6.26-4.95%2c8.46c-3.87%2c3.45-7.71%2c7-11.1%2c10.9c-4.36%2c5-10.79%2c4.97-15.14-0.04 c-3.3-3.81-6.99-7.39-10.94-10.52c-5.7-4.52-5.85-11.19-0.32-15.83c4.07-3.41%2c7.89-7.19%2c11.4-11.18c4.32-4.9%2c10.44-5.06%2c14.89-0.22 c3.7%2c4.02%2c7.85%2c7.61%2c11.55%2c11.63C1053.35%2c447.96%2c1054.61%2c450.49%2c1056.12%2c452.77z M1024.05%2c453.86c2.65%2c2.49%2c5.61%2c5.27%2c8.15%2c7.66 c3-2.98%2c5.93-5.91%2c8.06-8.03c-2.5-2.72-5.25-5.7-7.85-8.53C1029.78%2c447.76%2c1026.98%2c450.74%2c1024.05%2c453.86z'/%3e %3cpath d='M1054.54%2c712.58c-1.07%2c1.22-2.15%2c3.55-3.77%2c4.02c-1.8%2c0.53-4.85%2c0.09-6.04-1.17c-4.09-4.34-7.73-9.14-11.28-13.95 c-1.75-2.38-1.33-5.07%2c0.88-7.1c2.22-2.04%2c5.19-2.35%2c7.11-0.22c4.34%2c4.8%2c8.21%2c10.02%2c12.18%2c15.14 C1054.12%2c709.93%2c1054.11%2c710.95%2c1054.54%2c712.58z'/%3e %3cpath d='M1054.83%2c367.78c-0.92%2c1.89-1.37%2c3.36-2.24%2c4.5c-3.18%2c4.16-6.45%2c8.26-9.8%2c12.29c-2.39%2c2.89-5.71%2c3.32-8.23%2c1.29 c-2.5-2.02-2.77-5.32-0.47-8.31c3.27-4.25%2c6.63-8.43%2c10.01-12.6c1.79-2.2%2c4.32-2.94%2c6.69-1.64 C1052.44%2c364.21%2c1053.48%2c366.21%2c1054.83%2c367.78z'/%3e %3cpath d='M1083.61%2c634.04c1.91%2c0.69%2c2.91%2c0.9%2c3.75%2c1.38c3.79%2c2.16%2c7.58%2c4.32%2c11.28%2c6.63c3.11%2c1.94%2c3.97%2c4.89%2c2.46%2c7.65 c-1.59%2c2.91-4.8%2c3.82-8.07%2c2.02c-3.93-2.16-7.81-4.43-11.59-6.83c-2.34-1.48-3.54-3.92-2.2-6.43 C1080.23%2c636.62%2c1082.26%2c635.35%2c1083.61%2c634.04z'/%3e %3cpath d='M1101.78%2c434.09c-0.62%2c0.78-1.61%2c2.72-3.18%2c3.8c-3.48%2c2.4-7.21%2c4.45-10.92%2c6.5c-3.27%2c1.81-6.52%2c1.02-8.13-1.77 c-1.63-2.82-0.71-5.96%2c2.53-7.93c3.72-2.28%2c7.44-4.57%2c11.31-6.57C1097.38%2c426.04%2c1101.68%2c428.56%2c1101.78%2c434.09z'/%3e %3cpath d='M1120.45%2c545.51c-1.99%2c0-4%2c0.18-5.97-0.04c-3.2-0.36-4.96-2.47-4.93-5.57c0.03-2.92%2c1.72-5.12%2c4.75-5.32 c4.09-0.27%2c8.22-0.27%2c12.31%2c0c3.03%2c0.2%2c4.69%2c2.37%2c4.72%2c5.33c0.03%2c3.14-1.71%2c5.2-4.91%2c5.56 C1124.45%2c545.69%2c1122.44%2c545.51%2c1120.45%2c545.51z'/%3e%3c/g%3e%3c/svg%3e";

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
    handleEtherscan,
    showCardName,
    columns
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
      }, /*#__PURE__*/React.createElement("div", {
        className: "explorer-simple-card-trait-icon-container"
      }, /*#__PURE__*/React.createElement("img", {
        className: "explorer-simple-card-trait",
        src: trait.icon_url,
        key: index
      })), /*#__PURE__*/React.createElement("div", {
        className: "explorer-simple-card-trait-name"
      }, trait.name)) : /*#__PURE__*/React.createElement(GetTraitImage, {
        traitType: trait.type,
        key: index
      });
    })), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-trait-toggler",
      onClick: () => setShowTraits(!showTraits)
    }, /*#__PURE__*/React.createElement("img", {
      src: img
    }), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-trait-count"
    }, /*#__PURE__*/React.createElement("div", null, metadata.traits.length, " ")))))), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-trait-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-token-name"
    }, showCardName ? metadata.name : '#' + meta.id), /*#__PURE__*/React.createElement("div", {
      className: "explorer-simple-card-opensea-etherscan"
    }, /*#__PURE__*/React.createElement("img", {
      src: img$2,
      style: {
        maxHeight: '30px'
      },
      onClick: () => handleOpenOpensea(meta.id)
    }), /*#__PURE__*/React.createElement("img", {
      src: img$1,
      style: {
        maxHeight: '30px'
      },
      onClick: () => handleEtherscan()
    }))));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `${columns === 3 ? `col-lg-4` : 'col-lg-3'}  col-md-2 mb-4`
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

var css_248z = ".layer-image-preview {\r\n  padding-bottom: 20px;\r\n  text-align: center;\r\n}\r\n.infinite-scroll-component__outerdiv {\r\n  max-width: 1200px;\r\n  margin: 0 auto;\r\n}\r\n.infinite-scroll-component {\r\n  overflow-x: hidden !important;\r\n}\r\n.infinite-scroll-component::-webkit-scrollbar {\r\n  width: 0;\r\n}\r\n.explorer-simple-card-trait-div {\r\n  padding-right: 5px;\r\n  display: flex;\r\n  margin: 10px 0;\r\n  /* position: relative; */\r\n}\r\n.explorer-simple-card-trait-name {\r\n  background-color: #000;\r\n  padding: 5px 10px;\r\n  border-radius: 5px;\r\n  margin-left: 10px;\r\n  text-overflow: ellipsis;\r\n}\r\n.explorer-simple-card-trait-div:hover .explorer-simple-card-trait-name {\r\n  display: block;\r\n  cursor: pointer;\r\n}\r\n/* .explorer-simple-card-trait-name {\r\n  display: none;\r\n  background-color: #6d6c6c;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  white-space: nowrap;\r\n  z-index: 22222222222;\r\n  padding: 10px 0;\r\n  border-radius: 5px;\r\n  width: 100%;\r\n  text-align: center;\r\n  height: 100%;\r\n  line-height: 15px;\r\n} */\r\n.explorer-simple-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  text-align: left;\r\n  border-radius: 10px;\r\n  overflow: hidden;\r\n  color: #fff;\r\n  cursor: pointer;\r\n}\r\n.explorer-dark .explorer-simple-card-trait-container {\r\n  background: linear-gradient(rgb(20, 33, 46), rgb(14, 25, 36));\r\n}\r\n.explorer-simple-card-trait-container {\r\n  padding: 10px;\r\n  background: linear-gradient(rgb(20, 33, 46), rgb(14, 25, 36));\r\n}\r\n.explorer-simple-card-trait {\r\n  max-width: 30px;\r\n}\r\n.explorer-simple-card-img-trait {\r\n  position: relative;\r\n  display: flex;\r\n  z-index: 333333333;\r\n}\r\n.explorer-simple-card-trait-toggler {\r\n  position: relative;\r\n  background-color: #fff9f9db;\r\n  /* padding: 10px 15px; */\r\n  height: 45px;\r\n  max-width: 40px;\r\n  border-radius: 5px;\r\n}\r\n.explorer-simple-card-trait-icon-container {\r\n  background-color: #000000db;\r\n  padding: 3px;\r\n  border-radius: 5px;\r\n}\r\n.explorer-simple-card-trait-count {\r\n  position: absolute;\r\n  bottom: -5px;\r\n  right: -5px;\r\n  color: #fff;\r\n  font-weight: 600;\r\n  background-color: red;\r\n  border-radius: 100%;\r\n  font-size: 12px;\r\n  width: 16px;\r\n  height: 16px;\r\n  text-align: center;\r\n}\r\n.explorer-simple-card-trait-count div {\r\n  /* position: absolute; */\r\n  left: 0;\r\n  right: 0;\r\n  margin: auto;\r\n}\r\n.explorer-simple-card-shown {\r\n  opacity: 1;\r\n  transition: all 0.3s;\r\n}\r\n.explorer-simple-card-hided {\r\n  opacity: 0;\r\n  transition: all 0.3s;\r\n}\r\n.explorer-simple-card-opensea-etherscan {\r\n  padding-top: 10px;\r\n  display: flex;\r\n  gap: 5px;\r\n}\r\n.explorer-simple-card-traits {\r\n  position: absolute;\r\n  bottom: 10px;\r\n  left: 10px;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  flex-direction: column;\r\n  margin-top: 10px;\r\n  min-height: 30px;\r\n}\r\n.dust-pool-root {\r\n  max-width: 1140px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n  margin-top: 30px;\r\n  font-family: poppins;\r\n}\r\n.dust-pool-textbox {\r\n  text-align: center;\r\n  max-width: 600px;\r\n  margin: 0 auto;\r\n}\r\n.pool-subtitle {\r\n  font-size: 30px;\r\n  font-weight: 600;\r\n}\r\n.tab-choose {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-bottom: 30px;\r\n  text-transform: uppercase;\r\n}\r\n.tab-choose div {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  padding: 12px 15px;\r\n}\r\n.tab-choose div:hover {\r\n  cursor: pointer;\r\n}\r\n.tab-choose .active-tab {\r\n  background-color: #000;\r\n  color: #fff;\r\n}\r\n.tab-choose div:first-child {\r\n  border: 2px solid #000;\r\n  border-top-left-radius: 10px;\r\n  border-bottom-left-radius: 10px;\r\n}\r\n.tab-choose div:nth-child(2) {\r\n  border-top: 2px solid #000;\r\n  border-bottom: 2px solid #000;\r\n}\r\n.tab-choose div:nth-child(3) {\r\n  border: 2px solid #000;\r\n  border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px;\r\n}\r\n/*classes from bootstrap*/\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n.container {\r\n  width: 100%;\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n.mt-5,\r\n.my-5 {\r\n  margin-top: 3rem !important;\r\n}\r\n.row {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  margin-right: -15px;\r\n  margin-left: -15px;\r\n}\r\n.col-12 {\r\n  flex: 0 0 100%;\r\n  max-width: 100%;\r\n}\r\n.col-12,\r\n.col-lg-6,\r\n.col-lg-3,\r\n.col-lg-4,\r\n.col-md-6 {\r\n  position: relative;\r\n  width: 100%;\r\n  min-height: 1px;\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n.col-6 {\r\n  flex: 0 0 50%;\r\n  max-width: 50%;\r\n}\r\n.mb-1 {\r\n  margin-bottom: 0.25rem !important;\r\n}\r\n.mb-2 {\r\n  margin-bottom: 0.5rem !important;\r\n}\r\n.mb-3 {\r\n  margin-bottom: 0.75rem !important;\r\n}\r\n.mt-2 {\r\n  margin-top: 0.5rem !important;\r\n}\r\n.pb-4 {\r\n  padding-bottom: 1.5rem !important;\r\n}\r\n.w-100 {\r\n  width: 100% !important;\r\n}\r\n.text-right {\r\n  text-align: right !important;\r\n}\r\n.dust-pool-card p {\r\n  margin-block-start: 0;\r\n}\r\n.section-divider-img {\r\n  max-height: 35px;\r\n  z-index: 2;\r\n}\r\n@media only screen and (max-width: 500px) {\r\n  .section-divider-img {\r\n    max-height: 25px;\r\n    z-index: 2;\r\n  }\r\n}\r\n@media (min-width: 576px) {\r\n  .container {\r\n    max-width: 540px;\r\n  }\r\n}\r\n@media (max-width: 600px) {\r\n  .dust-pool-card .dust-pool-btn {\r\n    position: unset !important;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .container {\r\n    max-width: 720px;\r\n  }\r\n}\r\n.col-md-6 {\r\n  flex: 0 0 50%;\r\n  max-width: 50%;\r\n}\r\n@media (min-width: 992px) {\r\n  .container {\r\n    max-width: 960px;\r\n  }\r\n  .col-lg-6 {\r\n    flex: 0 0 50%;\r\n    max-width: 50%;\r\n  }\r\n  .col-lg-3 {\r\n    flex: 0 0 25%;\r\n    max-width: 25%;\r\n  }\r\n  .col-lg-4 {\r\n    flex: 0 0 33.333333%;\r\n    max-width: 33.333333%;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .container {\r\n    max-width: 1140px;\r\n  }\r\n}\r\n@media (max-width: 1000px) {\r\n  .col-lg-3 {\r\n    flex: 0 0 50%;\r\n    max-width: 50%;\r\n  }\r\n  .col-lg-4 {\r\n    flex: 0 0 50%;\r\n    max-width: 50%;\r\n  }\r\n}\r\n@media (max-width: 650px) {\r\n  .col-lg-3 {\r\n    flex: 0 0 100%;\r\n    max-width: 100%;\r\n  }\r\n  .col-lg-4 {\r\n    flex: 0 0 100%;\r\n    max-width: 100%;\r\n  }\r\n}\r\n@media only screen and (max-width: 945px) {\r\n  .dust-pool-root {\r\n    max-width: 100%;\r\n  }\r\n}\r\n";
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
    showCardName,
    etherscanUrl,
    columns
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
        handleOpenOpensea: handleOpenOpensea,
        handleEtherscan: handleEtherscan,
        columns: columns
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

const ExplorerComponent = _ref => {
  let {
    tokenAddres,
    poolAddress,
    chainId,
    rpcUrl,
    openseaUrl,
    etherScanUrl,
    componentHeight,
    serverUrl,
    isAdmin,
    updateSelectedIds,
    selectedCardIds,
    showCardName,
    darkMode,
    etherscanUrl,
    columns
  } = _ref;
  const {
    nftList
  } = useGetNftsList(chainId, tokenAddres, poolAddress, rpcUrl);
  const [traitTypes, setTraitTypes] = useState(null);
  useEffect(() => {
    const getTraitTypes = async () => {
      await axios.get(serverUrl + '/trait_types').then(resp => setTraitTypes(resp.data));
    };
    getTraitTypes();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    className: `${darkMode && 'explorer-dark'}`
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
    showCardName: showCardName,
    etherscanUrl: etherscanUrl,
    columns: columns
  }) : /*#__PURE__*/React.createElement("p", null, "Empty pool")) : /*#__PURE__*/React.createElement(SpinnerDotted, {
    color: "#000",
    size: 200,
    style: {
      paddingTop: '30px'
    }
  }));
};

export { ExplorerComponent };
