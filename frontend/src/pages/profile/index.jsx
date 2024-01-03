import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import profileReducer from '../../reducers/profileReducer';
import axios from 'axios';
import Header from '../../components/Header';
import './styles.css';
import ProfileCover from '../../components/Profile/ProfileCover';
import ProfilePictureInfo from '../../components/Profile/ProfilePictureInfo';

import CreatePost from '../../components/Post/CreatePost';
import CreatePostPopup from '../../components/Post/Popup';

import ProfileMenu from '../../components/Profile/ProfileMenu';
import Photos from '../../components/Profile/Photos';
import Friends from '../../components/Profile/Friends';
import Post from '../../components/Post/PostComponent';

import ProfileDetails from '../../components/Profile/ProfileDetails';

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [coverMenu, setCoverMenu] = useState(false);
  const givenUsername = username === undefined ? user.username : username;
  const navigate = useNavigate();
  const [{ profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  const isVisitor = givenUsername !== user.username;
  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${givenUsername}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.userCheck === false) {
        navigate('/profile');
      } else {
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [givenUsername]);
  return (
    <div className='profile'>
      <Header />
      <div className='profileTop'>
        <div className='profileContainer'>
          <ProfileCover
            cover={profile?.cover}
            setCoverMenu={setCoverMenu}
            coverMenu={coverMenu}
            visitor={isVisitor}
          />
          <ProfilePictureInfo profile={profile} visitor={isVisitor} />
          <ProfileMenu visitor={isVisitor} />
        </div>
      </div>
      <div className='profileBottom'>
        <div className='profileContainer'>
          <div className='bottomContainer'>
            {/* <FriendSuggestions /> */}
            <div className='profileGrid'>
              <div className='profileGridLeft'>
                <ProfileDetails
                  detailss={profile.details}
                  visitor={isVisitor}
                />
                <Photos username={givenUsername} token={user.token} />
                <Friends friends={profile?.friends} id='friends' />
              </div>
              <div className='profileGridRight'>
                {!isVisitor && (
                  <CreatePost user={user} setSeePostPopup={setVisible} />
                )}
                {visible && (
                  <div className='profilePostPopup'>
                    <CreatePostPopup
                      user={user}
                      setSeePostPopup={setVisible}
                      posts={profile?.posts}
                      dispatch={dispatch}
                      profile
                    />
                  </div>
                )}

                <div className='posts'>
                  {profile?.posts &&
                    profile?.posts.length > 0 &&
                    profile?.posts.map((post) => (
                      <Post key={post._id} post={post} user={user} profile />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
