import React, { useCallback, useEffect, useReducer } from 'react';
import './styles.css';
import photosReducer from '../../../reducers/photosReducer';
import axios from 'axios';
const Photos = ({ username, token }) => {
  const [{ photos }, dispatch] = useReducer(photosReducer, {
    loading: false,
    photos: {},
    error: '',
  });
  useEffect(() => {
    getPhotos();
  }, [username]);

  console.log(photos?.total_count);

  const path = `${username}/*`;
  const max = 30;
  const sort = 'desc';

  const getPhotos = useCallback(async () => {
    try {
      dispatch({
        type: 'PHOTOS_REQUEST',
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        {
          path,
          max,
          sort,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: 'PHOTOS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'PHOTOS_ERROR',
        payload: error.response.data.message,
      });
    }
  }, [path, token]);
  return (
    <div className='profileCard'>
      <div className='profileCardHeader'>
        Photos
        <div className='profileHeaderLink'>See all photos</div>
      </div>
      <div className='profileCardCount'>
        {photos?.total_count == 0
          ? ''
          : photos?.total_count == 1
          ? '1 Photo'
          : `${photos?.total_count} Photos`}
      </div>
      <div className='profileCardGrid'>
        {photos?.resources &&
          !!photos?.resources.length &&
          photos?.resources.slice(0, 9).map((img) => (
            <div className='galleryCard' key={img.public_id}>
              <img src={img.secure_url} alt='' />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
