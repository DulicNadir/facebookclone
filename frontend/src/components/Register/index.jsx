/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './styles.css';
import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import DateOfBirth from './DateOfBirth';
import Gender from './Gender';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../Input/RegisterInput';
const RegisterForm = ({ setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };
  const [user, setUser] = useState(userInfos);
  const [dateMessage, setDateMessage] = useState('');
  const [genderMessage, setGenderMessage] = useState('');
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bDay,
    bMonth,
    gender,
  } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required('First name is required')
      .min(3, 'First name must be at least 3 characters'),
    last_name: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    bYear: Yup.string().required('Year is required'),
    bMonth: Yup.string().required('Month is required'),
    bDay: Yup.string().required('Day is required'),
  });

  /*2022- 0, 2022- 1, 2022- 2...*/
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => currentYear - index);

  /*1+ 0, 1+ 1, 1+ 2--*/
  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const submitRegister = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8080/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (err) {
      setLoading(false);
      setSuccess('');
      setError(err.response.data.message);
    }
  };

  return (
    <div className='blur'>
      <div className='register'>
        <div className='registerHeader'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Sign up</span>
          <span>It is quick and easy</span>
        </div>
        <Formik
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bDay,
            bMonth,
            gender,
          }}
          enableReinitialize
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let pickedDate = new Date(bYear, bMonth - 1, bDay);
            let areYou18 = new Date(1970 + 18, 0, 1);
            if (currentDate - pickedDate < areYou18) {
              setDateMessage('You must be at least 18 years old');
            } else if (gender === '') {
              setDateMessage('');
              setGenderMessage('Please select a gender');
            } else {
              setDateMessage('');
              setGenderMessage('');
              submitRegister();
            }
          }}>
          {(formik) => (
            <Form className='regForm'>
              <div className='regLine'>
                <RegisterInput
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  placeholder='Last name'
                  name='last_name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='regLine'>
                <RegisterInput
                  type='text'
                  placeholder='Email'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='regLine'>
                <RegisterInput
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='regCol'>
                <div className='regLineHeader'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <DateOfBirth
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  dateMessage={dateMessage}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='regCol'>
                <div className='regLineHeader'>
                  Gender <i className='info_icon'></i>
                </div>
                <Gender
                  handleRegisterChange={handleRegisterChange}
                  genderMessage={genderMessage}
                />
              </div>
              <div className='regBtnWrapper'>
                <button className='blueBtn openSignup'>Sign up</button>
              </div>
              <DotLoader color='#1876f2' loading={loading} />
              {error && <div className='errorText'>{error}</div>}
              {success && <div className='successText'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
