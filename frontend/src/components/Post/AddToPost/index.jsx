import React from 'react';
import { Dots, Feeling, Photo } from '../../../svg';
import './styles.css';
const AddToPost = ({ setShow }) => {
  return (
    <div className='addToPost'>
      <div className='addText'>Add to your post</div>
      <div className='postHeaderRight hover1' onClick={() => setShow(true)}>
        <Photo color='#45bd62' />
      </div>
      <div className='postHeaderRight hover1'>
        <i className='tag_icon'></i>
      </div>
      <div className='postHeaderRight hover1'>
        <Feeling color='#f7b928' />
      </div>
      <div className='postHeaderRight hover1'>
        <Dots color='#65676b' />
      </div>
    </div>
  );
};

export default AddToPost;
