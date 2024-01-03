import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import Header from '../../components/Header';
import { useClickOutside } from '../../helpers/clickAway';
import LeftHome from '../../components/Home/HomeLeft';
import { useSelector } from 'react-redux';
import HomeRight from '../../components/Home/HomeRight';
import './styles.css';
import CreatePost from '../../components/Post/CreatePost';
import axios from 'axios';
import postReducer from '../../reducers/postReducer';
import CreatePostPopup from '../../components/Post/Popup';
import Post from '../../components/Post/PostComponent';
import profileReducer from '../../reducers/profileReducer';

const Home = ({ setSeePostPopup, seePostPopup }) => {
  const [show, setShow] = useState(true);
  const { user } = useSelector((user) => ({ ...user }));
  const element = useRef(null);
  useClickOutside(element, () => {
    setShow(false);
  });
  const [{ posts }, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: '',
  });
  const [{ profile }, dispatch1] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });
  const getProfile = async () => {
    try {
      dispatch1({
        type: 'PROFILE_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch1({
        type: 'PROFILE_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch1({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };
  useEffect(() => {
    getAllPosts();
    getProfile();
  }, []);
  const getAllPosts = useCallback(async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response.data.message,
      });
    }
  }, [user.token]);

  return (
    <div className='home'>
      <Header page='home' />
      <LeftHome user={user} />
      <div className='homeMiddle'>
        <CreatePost user={user} setSeePostPopup={setSeePostPopup} />
        {seePostPopup && (
          <CreatePostPopup
            user={user}
            setSeePostPopup={setSeePostPopup}
            posts={posts}
            dispatch={dispatch}
          />
        )}
        <div className='posts'>
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <HomeRight profile={profile} />
    </div>
  );
};

export default Home;
