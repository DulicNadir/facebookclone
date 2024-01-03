import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HomeActive, Logo, Menu, Search, Home } from '../../svg';
import './styles.css';
import { useSelector } from 'react-redux';
import SearchMenu from './SearchMenu';
import MainMenu from './MainMenu';
import { useClickOutside } from '../../helpers/clickAway';
import UserMenu from './UserMenu';

const Header = ({ page }) => {
  const color = '#65676b';
  const { user } = useSelector((user) => ({ ...user }));
  const [showSearch, setShowSearch] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const mainMenu = useRef(null);
  const userMenu = useRef(null);

  useClickOutside(mainMenu, () => {
    setShowMainMenu(false);
  });
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className='headerLeft'>
        <Link to='/' className='headerLogo'>
          <div className='circle'>
            <Logo />
          </div>
        </Link>
        <div className='search search1'>
          <Search color={color} />
          <input
            type='text'
            placeholder='Search Facebook'
            className='hideInput'
          />
        </div>
      </div>
      {showSearch && <SearchMenu setShowSearch={setShowSearch} />}
      <div className='headerMiddle'>
        <Link
          to='/'
          className={`middleIcon ${page === 'home' ? 'active' : ''}`}>
          {page === 'home' ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to='/profile' className='profileLink hover1'>
          <img src={user?.picture} alt='User pic' />
          <span>{user?.first_name}</span>
        </Link>
      </div>
      <div className='headerRight'>
        <div
          className={`circleIcon hover1 ${showMainMenu && 'activeHeader'}`}
          onClick={() => setShowMainMenu(!showMainMenu)}
          ref={mainMenu}>
          <div style={{ transform: 'translateY(2px)' }}>
            <Menu />
          </div>
          {showMainMenu && <MainMenu />}
        </div>

        <div
          className={`circleIcon hover1 ${showUserMenu && 'activeHeader'}`}
          ref={userMenu}>
          <div
            style={{ transform: 'translateY(2px)' }}
            onClick={() => setShowUserMenu(!showUserMenu)}>
            <img src={user?.picture} alt='User pic' className='userPicMenu' />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
