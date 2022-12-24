import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';

export const BotttomRight = () => {
  const [isTop, setIsTop] = useState(true);

  const onScroll = () => {
    if (getTop() >= 100) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  });

  return <div className='material-symbols-outlined' css={[ScrollToTopStyles, isTop ? HideScrollToTop : '']} onClick={scroll} />;
};

const getTop = () =>
  Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

const scroll = ()=> {
  typeof window !== 'undefined' &&
    window.scroll({
      top: 0, // 最上部へスクロール
      behavior: 'smooth',
    });
};

const ScrollToTopStyles = css`
// <span class="material-symbols-outlined">
// arrow_upward
// </span>
  
  cursor: pointer;
  position: fixed;
  right: 5%;
  bottom: 5%;
  min-width: 48px;
  min-height: 48px;
  z-index: 100;
  transition: opacity 1s, visibility 1s, transform 0.5s;
  -webkit-transition: opacity 1s, visibility 1s, -webkit-transform 0.5s;
  opacity: 0.5;
  visibility: visible;

  /* PCのみ */
  @media (min-width: 795px) and (min-height: 795px) {
    :hover {
      transform: scale(1.2);
      -webkit-transform: scale(1.2);
    }
  }
`;

const HideScrollToTop = css`
  z-index: 0;
  opacity: 0;
  visibility: hidden;
`;