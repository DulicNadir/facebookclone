import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import LeftHome from '../../components/Home/HomeLeft';
import { useDispatch, useSelector } from 'react-redux';
import HomeRight from '../../components/Home/HomeRight';
import './styles.css';
import CreatePost from '../../components/Post/CreatePost';
import ActivateForm from '../../components/ActivateForm';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { token } = useParams();
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: 'VERIFY',
        payload: true,
      });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className='home'>
      {success && (
        <ActivateForm
          type='success'
          header='Account activation successful'
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type='error'
          header='Account activation failed'
          text={error}
          loading={loading}
        />
      )}

      <Header />
      <LeftHome user={user} />
      <div className='homeMiddle'>
        <CreatePost user={user} />
      </div>
      <HomeRight />
    </div>
  );
};

export default Activate;
