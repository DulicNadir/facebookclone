import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayAccesibility from './DisplayAccesibility';
import HelpSupport from './HelpSupport';
import Settings from './Settings';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);

  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/login');
  };
  return (
    <div className='mmenu'>
      {visible === 0 && (
        <div>
          <Link to='/profile' className='mmenuHeader hover3'>
            <img src={user?.picture} alt='User' />
            <div className='mmenuCol'>
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className='mmenuSplitter'></div>
          <div className='mmenuItem hover3'>
            <div className='smallCircle'>
              <i className='report_filled_icon'></i>
            </div>
            <div className='mmenuCol'>
              <div className='mmenuSpan1'>Give feedback</div>
            </div>
          </div>
          <div className='mmenuSplitter'></div>
          <div
            className='mmenuItem hover3'
            onClick={() => {
              setVisible(1);
            }}>
            <div className='smallCircle'>
              <i className='settings_filled_icon'></i>
            </div>
            <span>Settings & privacy</span>
            <div className='rArrow'>
              <i className='right_icon'></i>
            </div>
          </div>
          <div className='mmenuSplitter'></div>
          <div
            className='mmenuItem hover3'
            onClick={() => {
              setVisible(2);
            }}>
            <div className='smallCircle'>
              <i className='help_filled_icon'></i>
            </div>
            <span>Help & support</span>
            <div className='rArrow'>
              <i className='right_icon'></i>
            </div>
          </div>
          <div className='mmenuSplitter'></div>
          <div
            className='mmenuItem hover3'
            onClick={() => {
              // trebam implementirati dark mode
              // setVisible(3);
            }}>
            <div className='smallCircle'>
              <i className='dark_filled_icon'></i>
            </div>
            <span>Display & accessibility</span>
            <div className='rArrow'>
              <i className='right_icon'></i>
            </div>
          </div>
          <div className='mmenuSplitter'></div>
          <div className='mmenuItem hover3' onClick={() => logout()}>
            <div className='smallCircle'>
              <i className='logout_filled_icon'></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visible === 1 && <Settings setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccesibility setVisible={setVisible} />}
    </div>
  );
};

export default UserMenu;
