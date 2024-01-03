import React from 'react';
import { Dots } from '../../../svg';

import AddFriendCard from '../AddFriendCard';
import './styles.css';
const FriendSuggestions = () => {
  return (
    <div className='friendSuggestions'>
      <div className='suggestionsHeader'>
        People you may know
        <div className='postHeaderRight peopleCircle'></div>
      </div>
      <div className='suggestionList'></div>
    </div>
  );
};

export default FriendSuggestions;
