import React from 'react';
import { menu, create } from '../../../data/mainMenu';
import MainMenuItem from './MainMenuItem';
const MainMenu = () => {
  return (
    <div className='mainMenu'>
      <div className='mainMenuHeader'>Menu</div>
      <div className='mainMenuWrap scrollbar'>
        <div className='mainMenuLeft'>
          <div className='mainMenuSearch'>
            <i className='search_menu_icon'></i>
            <input type='text' placeholder='Search Menu' />
          </div>
          <div className='mainMenuGroup'>
            <div className='mainMenuGroupHeader'>Social</div>
            {menu.slice(0, 6).map((item, index) => {
              return <MainMenuItem key={index} {...item} />;
            })}
          </div>
          <div className='mainMenuGroup'>
            <div className='mainMenuGroupHeader'>Entertainment</div>
            {menu.slice(6, 9).map((item, index) => {
              return <MainMenuItem key={index} {...item} />;
            })}
          </div>

          <div className='mainMenuGroup'>
            <div className='mainMenuGroupHeader'>Personal</div>
            {menu.slice(11, 15).map((item, index) => {
              return <MainMenuItem key={index} {...item} />;
            })}
          </div>
          <div className='mainMenuGroup'>
            <div className='mainMenuGroupHeader'>Professional</div>
            {menu.slice(15, 17).map((item, index) => {
              return <MainMenuItem key={index} {...item} />;
            })}
          </div>
          <div className='mainMenuGroup'>
            <div className='mainMenuGroupHeader'>Community resources</div>
            {menu.slice(17, 21).map((item, index) => {
              return <MainMenuItem key={index} {...item} />;
            })}
          </div>
          <div className='mainMenuGroup'>
            <div className='mainMenuGroupHeader'>More from Meta</div>
            {menu.slice(21, 23).map((item, index) => {
              return <MainMenuItem key={index} {...item} />;
            })}
          </div>
        </div>
        <div className='mainMenuRight'>
          <div className='mainMenuRightHeader'>Create</div>
          {create.map((item, index) => {
            return (
              <div className='mainMenuRightItem hover1' key={index}>
                <div className='mainMenuRightCircle'>
                  <i className={item.icon}></i>
                </div>
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
