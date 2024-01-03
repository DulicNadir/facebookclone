import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import DotLoader from 'react-spinners/DotLoader';
import LoginInput from '../Input/LoginInput';

const loginInfos = {
  email: '',
  password: '',
};

const loginValidation = Yup.object({
  email: Yup.string()
    .required('Email is required !')
    .email('Email must be a valid email !'),
  password: Yup.string().required('Password is required !'),
});

const LoginForm = ({ setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });
      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className='loginWrap'>
      <div className='login1'>
        <img src='../../icons/facebook.svg' alt='' />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className='login2'>
        <div className='login2Wrap'>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}>
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Email address'
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleLoginChange}
                />
                <button type='submit' className='blueBtn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/reset' className='forgotPassword'>
            Forgotten password ?
          </Link>
          <DotLoader color='#1876f2' loading={loading} />

          {error && <div className='errorText'>{error}</div>}
          <div className='signSplitter'></div>
          <button
            className='blueBtn openSignup'
            onClick={() => setVisible(true)}>
            Create Account
          </button>
        </div>
        <Link to='/' className='signExtra'>
          <b>Create a Page </b>
          for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
