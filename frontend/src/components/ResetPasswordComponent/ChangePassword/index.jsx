import { Link, useNavigate } from 'react-router-dom';

import { Form, Formik } from 'formik';
import LoginInput from '../../Input/LoginInput';
import * as Yup from 'yup';
import axios from 'axios';
const ChangePassword = ({
  password,
  confPassword,
  setPassword,
  setConfPassword,
  error,
  setLoading,
  setError,
  userInfo,
}) => {
  const { email } = userInfo;
  const navigate = useNavigate();
  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });
      setError('');
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const changePasswordValidation = Yup.object({
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 6 characters'),
    confPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
  return (
    <div className='resetForm'>
      <div className='resetFormHeader'>Change password</div>
      <div className='resetFormText'>Enter your new password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          confPassword,
        }}
        validationSchema={changePasswordValidation}
        onSubmit={() => changePassword()}>
        {(formik) => (
          <Form>
            <LoginInput
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New password'
            />
            <LoginInput
              type='password'
              name='confPassword'
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder='Confirm new password'
            />
            {error && <div className='errorText'>{error}</div>}
            <div className='resetFormButtons'>
              <Link to='/login' className='grayBtn'>
                Cancel
              </Link>
              <button type='submit' className='blueBtn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
