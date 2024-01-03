import { Link } from 'react-router-dom';
import './styles.css';
import { Form, Formik } from 'formik';
import LoginInput from '../../../components/Input/LoginInput';
import axios from 'axios';
import * as Yup from 'yup';
const SearchAccount = ({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfo,
  setVisible,
}) => {
  const validateEmail = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setUserInfo(data);
      setVisible(1);
      setError('');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='resetForm'>
      <div className='resetFormHeader'>Find your account</div>
      <div className='resetFormText'>Please enter your email address</div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => handleSubmit()}>
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
            />
            {error && <div className='errorText'>{error}</div>}
            <div className='resetFormButtons'>
              <Link to='/login' className='grayBtn'>
                Cancel
              </Link>
              <button type='submit' className='blueBtn'>
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;
