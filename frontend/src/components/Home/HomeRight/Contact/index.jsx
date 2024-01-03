import { Link } from 'react-router-dom';
import './styles.css';
import React from 'react';

const Contact = ({ friends }) => {
  return (
    <div className='contact'>
      {friends &&
        friends?.map((friend) => (
          <Link
            to={`/profile/${friend.username}`}
            key={friend._id}
            className='singleContact hover3'>
            <div className='contactImage'>
              <img src={friend.picture} alt='' />
            </div>
            <span>
              {friend.first_name} {friend.last_name}
            </span>
          </Link>
        ))}
    </div>
  );
};

export default Contact;
