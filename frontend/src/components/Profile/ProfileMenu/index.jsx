import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ProfileMenu = ({ visitor }) => {
  return (
    <div className='profileMenuContainer'>
      <div className='profileMenu'>
        <Link to='/' className='active'>
          Posts
        </Link>
        {!visitor && (
          <Link to='/aboutMe' className='hover1'>
            About
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
