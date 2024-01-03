import React, { useRef, useState } from 'react';
import './styles.css';

import ProfilePicture from '../ProfilePicture';
import Friendship from '../Friendship';
const ProfilePictureInfo = ({ profile, visitor }) => {
  const { picture, first_name, last_name } = profile;
  const pictureRef = useRef(null);
  const [show, setShow] = useState(false);

  return (
    <div className='profileImageWrap'>
      {show && <ProfilePicture setShow={setShow} pictureRef={pictureRef} />}
      <div className='profileLeft'>
        <div className='profileImg'>
          <div
            ref={pictureRef}
            className='profileBg'
            style={{
              backgroundImage: `url(${picture})`,
              backgroundSize: 'cover',
            }}></div>
          {!visitor && (
            <div className='profileCircle' onClick={() => setShow(true)}>
              <i className='camera_filled_icon'></i>
            </div>
          )}
        </div>
        <div className='profileCol'>
          <div className='profileName'>
            {first_name} {last_name}
          </div>
        </div>
        <div className='profileFriendCount'></div>
        <div className='profileFriendImages'></div>
      </div>
      {visitor && (
        <Friendship friendshipp={profile?.friendship} profileId={profile._id} />
      )}
    </div>
  );
};

export default ProfilePictureInfo;
