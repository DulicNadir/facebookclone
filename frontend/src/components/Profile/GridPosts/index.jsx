import React from 'react';
import './styles.css';
const GridPosts = () => {
  return (
    <div className='createPost'>
      <div className='createPostHeader spaceBetween'>
        <div className='leftHeaderGrid'>Posts</div>
        <div className='settingsFlex'>
          <div className='grayBtn'>
            <i className='equalize_icon'></i>
          </div>
          <div className='grayBtn'>
            <i className='manage_icon'></i>
            Manage posts
          </div>
        </div>
      </div>
      <div className='hr'></div>
    </div>
  );
};

export default GridPosts;
