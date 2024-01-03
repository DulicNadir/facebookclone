import React, { useCallback, useRef, useState } from 'react';
import './styles.css';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../../helpers/getCroppedImg';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../../helpers/uploadImages';
import { updateProfileImage } from '../../../../helpers/updateProfileImage';
import { createPost } from '../../../../helpers/post';
import PulseLoader from 'react-spinners/PulseLoader';
import Cookies from 'js-cookie';

const UpdateProfilePicture = ({
  setImage,
  image,
  setError,
  setShow,
  pictureRef,
}) => {
  const [description, setDescription] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { user } = useSelector((state) => ({ ...state }));
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const updateProfilePic = useCallback(async () => {
    try {
      setLoading(true);
      const img = await getCroppedImg(image, croppedAreaPixels);
      const imgBlob = await fetch(img).then((r) => r.blob());
      const path = `${user.username}/profilePictures`;
      const formData = new FormData();
      formData.append('file', imgBlob);
      formData.append('path', path);
      const res = await uploadImage(formData, path, user.token);
      const newPicture = await updateProfileImage(res[0].url, user.token);
      if (newPicture === 'Zavrsio') {
        const newPost = await createPost(
          'profilePicture',
          null,
          description,
          res,
          user.id,
          user.token
        );
        if (newPost.status === 'Zavrsio') {
          setLoading(false);
          pictureRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set('user', JSON.stringify({ ...user, picture: res[0].url }));
          dispatch({
            type: 'UPDATEPICTURE',
            payload: res[0].url,
          });
          setShow(false);
        } else {
          console.log('ovdje');
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
    <div className='postBox updateImage'>
      <div className='postBoxHeader'>
        <div className='smallCircle' onClick={() => setImage('')}>
          <i className='exit_icon'></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className='updateImgDescription'>
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='detailsInput'></textarea>
      </div>
      <div className='updateCenter'>
        <div className='cropper'>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape='round'
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className='slider'>
          <div className='sliderCircle hover1' onClick={() => zoomOut()}>
            <i className='minus_icon'></i>
          </div>
          <input
            type='range'
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className='sliderCircle hover1' onClick={() => zoomIn()}>
            <i className='plus_icon'></i>
          </div>
        </div>
      </div>

      <div className='flexPt'>
        <i className='public_icon'></i>
        Your profile picture is public
      </div>
      <div className='updateSubmit'>
        <div className='blueLink' onClick={() => setImage('')}>
          Cancel
        </div>
        <button
          className='blueBtn'
          onClick={() => updateProfilePic()}
          disabled={loading}>
          {loading ? <PulseLoader color='#fff' size={10} /> : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
