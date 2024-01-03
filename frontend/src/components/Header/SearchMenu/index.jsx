import React, { useEffect, useRef } from 'react';
import { Return, Search } from '../../../svg';
import { useClickOutside } from '../../../helpers/clickAway';

const SearchMenu = ({ setShowSearch }) => {
  const color = '#65676b';
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearch(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className='headerLeft searchArea scrollbar' ref={menu}>
      <div className='searchWrap'>
        <div className='headerLogo'>
          <div className='circle hover1' onClick={() => setShowSearch(false)}>
            <Return />
          </div>
        </div>
        <div
          className='search'
          onClick={() => {
            input.current.focus();
          }}>
          <div>
            <Search color={color} />
          </div>
          <input type='text' placeholder='Search' ref={input} />
        </div>
      </div>
      <div className='searchHistoryHeader'>
        <span>Recent searches</span>
        <a>Edit</a>
        <div className='searchHistory'></div>
        <div className='searchResults scrollbar'></div>
      </div>
    </div>
  );
};

export default SearchMenu;
