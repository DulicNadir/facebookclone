import React from 'react';
import './styles.css';
const AddFriendCard = ({ item }) => {
  const { profile_picture, profile_name, last_name } = item;
  return (
    <div className='addFriendCard'>
      <div className='addFriendImg'>
        <img src={profile_picture} alt='' />
        <div className='addFriendInfo'>
          <div className='addFriendName'>
            {profile_name.length > 10
              ? `${profile_name.substring(0, 10)}...`
              : profile_name}
          </div>
          <div className='lightBlueBtn'>
            <img
              src='../../../icons/addFriend.png'
              alt=''
              className='filterBlue'
            />
            Add friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendCard;
