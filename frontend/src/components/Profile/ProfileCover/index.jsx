import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import './styles.css';
import getCroppedImg from '../../../helpers/getCroppedImg';
import { uploadImage } from '../../../helpers/uploadImages';
import {
  removeCoverPicture,
  updateCoverPicture,
} from '../../../helpers/updateCoverImage';
import { createPost } from '../../../helpers/post';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../../helpers/clickAway';

import PulseLoader from 'react-spinners/PulseLoader';

const ProfileCover = ({ cover, setCoverMenu, coverMenu, visitor }) => {
  const inputRef = useRef(null);
  const coverRef = useRef(null);
  const coverMenuRef = useRef(null);
  const coverPictureRef = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const [coverPicture, setCoverPicture] = useState(null);
  const [error, setError] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [width, setWidth] = useState();
  const [loading, setLoading] = useState(false);

  useClickOutside(coverMenuRef, () => {
    setCoverMenu(false);
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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
        setCoverPicture(e.target.result);
      };
    });
  };

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  const removeCoverPic = async () => {
    try {
      setLoading(true);
      removeCoverPicture(user.token);
      setLoading(false);
      setCoverPicture('');
      coverPictureRef.current.src = '';
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const updateCoverPic = useCallback(async () => {
    try {
      setLoading(true);
      const img = await getCroppedImg(coverPicture, croppedAreaPixels);
      const imgBlob = await fetch(img).then((r) => r.blob());
      const path = `${user.username}/coverPictures`;
      const formData = new FormData();
      formData.append('file', imgBlob);
      formData.append('path', path);
      const res = await uploadImage(formData, path, user.token);
      const newPicture = await updateCoverPicture(res[0].url, user.token);
      if (newPicture === 'Zavrsio') {
        const newPost = await createPost(
          'coverPicture',
          null,
          null,
          res,
          user.id,
          user.token
        );
        if (newPost.status === 'Zavrsio') {
          setLoading(false);
          setCoverPicture('');
          coverPictureRef.current.src = res[0].url;
        } else {
          setLoading(false);
          setError(newPost);
        }
      } else {
        setLoading(false);
        setError(newPicture);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  });

  return (
    <div className='profileCover' ref={coverRef}>
      {coverPicture && (
        <div className='saveChangesCover'>
          <div className='saveChangesLeft'>
            <i className='public_icon'></i>Your cover photo is public
          </div>
          <div className='saveChangesRight'>
            <button className='blueBtn' onClick={() => setCoverPicture('')}>
              Cancel
            </button>
            <button
              className='blueBtn'
              onClick={() => updateCoverPic()}
              disabled={loading}>
              {loading ? (
                <PulseLoader color='#fff' size={8} margin={2} />
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      )}
      <input type='file' ref={inputRef} hidden onChange={handleImage} />
      {error && (
        <div className='postError commentError'>
          <div className='postErrorText'>{error}</div>
          <button className='blueBtn' onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className='coverCropper'>
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit='horizontal-cover '
          />
        </div>
      )}
      {!coverPicture && (
        <img src={cover} alt='' className='cover' ref={coverPictureRef} />
      )}
      {!visitor && (
        <div className='updateCover' ref={coverMenuRef}>
          <div
            className='openCoverUpdate'
            onClick={() => setCoverMenu((prev) => !prev)}>
            <i className='camera_filled_icon'></i>
            Add cover photo
          </div>
          {coverMenu && (
            <div className='openCoverMenu'>
              <div
                className='openCoverMenuItem hover1'
                onClick={() => removeCoverPic()}>
                <i className='photo_icon'></i>
                Remove photo
              </div>
              <div
                className='openCoverMenuItem hover1'
                onClick={() => inputRef.current.click()}>
                <i className='upload_icon'></i>
                Upload photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCover;
