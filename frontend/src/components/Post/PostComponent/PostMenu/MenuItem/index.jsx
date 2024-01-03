import React from 'react';
import './styles.css';
const MenuItem = ({ icon, text, subtitle, onClick }) => {
  return (
    <li className='hover1' onClick={onClick}>
      <i className={icon}></i>
      <div className='postMenuText'>
        <span>{text}</span>
        {subtitle && <span className='menuPostCol'>{subtitle}</span>}
      </div>
    </li>
  );
};

export default MenuItem;
