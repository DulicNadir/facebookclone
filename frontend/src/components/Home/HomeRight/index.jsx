import { Dots, NewRoom, Search } from '../../../svg';
import Contact from './Contact';
import './styles.css';

const contactsHeaderIcons = [<NewRoom />, <Search />, <Dots />];
const HomeRight = ({ profile }) => {
  return (
    <div className='homeRight'>
      <div className='contactsArea'>
        <div className='contactsHeader'>
          <div className='contactsHeaderLeft'>Friends</div>
          <div className='contactsHeaderRight'>
            {contactsHeaderIcons.map((icon, i) => (
              <div className='contactsCircle hover1' key={i}>
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div className='contactsList'>
          <Contact friends={profile?.friends} />
        </div>
        <div className='contactsHeader'>
          <div className='contactsHeaderLeft'>Requests</div>
        </div>
        <div className='contactsList'>
          <Contact friends={profile?.requests} />
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
