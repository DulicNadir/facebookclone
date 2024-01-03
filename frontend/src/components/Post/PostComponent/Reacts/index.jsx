import React from 'react';
import { reactsArray } from './reactsArray';
import './styles.css';
const Reacts = ({ visible, setVisible, handleReact }) => {
  return (
    <>
      {visible && (
        <div
          className='reactPopup'
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}>
          {reactsArray.map((react, i) => (
            <div
              className='react'
              key={i}
              onClick={() => handleReact(react.name)}>
              <img src={react.image} alt='' />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Reacts;
