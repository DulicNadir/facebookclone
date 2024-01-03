import './styles.css';
import { Link } from 'react-router-dom';
const Friends = ({ friends }) => {
  return (
    <div className='profileCard'>
      <div className='profileCardHeader'>
        Friends
        <div className='profileHeaderLink'>See all friends</div>
      </div>
      <div className='profileCardCount'>
        {friends?.length === 0
          ? ''
          : friends?.length == 1
          ? '1 friend'
          : `${friends?.length} Friends `}
      </div>
      <div className='profileCardGrid'>
        {friends &&
          friends?.length > 0 &&
          friends?.slice(0, 9).map((friend, i) => (
            <Link
              to={`/profile/${friend?.username}`}
              key={i}
              className='profilePhotoCard'>
              <img src={friend?.picture} alt='' />
              <span>
                {friend?.first_name} {friend?.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Friends;
