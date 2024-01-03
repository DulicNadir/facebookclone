import React from 'react';
import './styles.css';
const PostError = ({ error, setError }) => {
  return (
    <div className='postError'>
      <div>{error}</div>
      <button
        className='blueBtn'
        onClick={() => {
          setError('');
        }}>
        Try again
      </button>
    </div>
  );
};

export default PostError;
