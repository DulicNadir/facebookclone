import React, { useRef, useState } from 'react';
import './styles.css';
import UpdateProfilePicture from './UpdateProfilePicture';
import { removeProfilePicture } from '../../../helpers/updateProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
const ProfilePicture = ({ setShow, pictureRef }) => {
  const refInput = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/jpg' &&
        img.type !== 'image/gif' &&
        img.type !== 'image/webp'
      ) {
        setError('Only images are allowed');
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        setImage(e.target.result);
      };
    });
  };
  const removeProfilePic = async () => {
    try {
      removeProfilePicture(user.token);
      pictureRef.current.style.backgroundImage = `url(https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png)`;
      Cookies.set(
        'user',
        JSON.stringify({
          ...user,
          picture:
            'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
        })
      );
      dispatch({
        type: 'UPDATEPICTURE',
        payload:
          'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
      });
      setImage('');
      pictureRef.current.src = '';
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='blur'>
      <input
        type='file'
        name=''
        id=''
        ref={refInput}
        hidden
        onChange={handleImage}
      />
      <div className='postBox pictureBox'>
        <div className='postBoxHeader'>
          <div className='smallCircle' onClick={() => setShow(false)}>
            <i className='exit_icon'></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className='updatePictureWrap'>
          <div className='updatePictureButtons'>
            <button
              className='lightBlueBtn'
              onClick={() => refInput.current.click()}>
              <i className='plus_icon'></i>
              Upload photo
            </button>
            <button className='grayBtn' onClick={() => removeProfilePic()}>
              <i className='frame_icon'></i>
              Remove profie picture
            </button>
          </div>
        </div>
        {error && (
          <div className='postError commentError'>
            <div className='postErrorText'>{error}</div>
            <button className='blueBtn' onClick={() => setError('')}>
              Try again
            </button>
          </div>
        )}
        <div className='oldPicturesContainer'></div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setError={setError}
          setShow={setShow}
          pictureRef={pictureRef}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
