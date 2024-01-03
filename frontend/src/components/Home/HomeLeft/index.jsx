import LeftLink from './LeftLink';
import './styles.css';
import { left } from '../../../data/home';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from '../../../svg';
import { useState } from 'react';

const LeftHome = ({ user }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='leftHome scrollbar'>
      <Link to='/profile' className='leftLink hover2'>
        <img src={user?.picture} alt='' />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link) => (
        <LeftLink
          key={link.text}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className='leftLink hover1' onClick={() => setVisible(true)}>
          <div className='smallCircle'>
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className='moreLeft'>
          {left.slice(8, left.length).map((link) => (
            <LeftLink
              key={link.text}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className='leftLink hover1' onClick={() => setVisible(false)}>
            <div className='smallCircle rotate180'>
              <ArrowDown1 />
            </div>
            <span>See less</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftHome;
