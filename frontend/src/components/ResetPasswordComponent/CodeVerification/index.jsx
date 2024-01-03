import { Link } from 'react-router-dom';

import { Form, Formik } from 'formik';
import LoginInput from '../../../components/Input/LoginInput';
import * as Yup from 'yup';
import axios from 'axios';
const CodeVerification = ({
  code,
  setCode,
  error,
  loading,
  setLoading,
  setVisible,
  setError,
  userInfo,
}) => {
  const { email } = userInfo;
  const codeValidation = Yup.object({
    code: Yup.string()
      .required('Required')
      .min(5, 'Code must be 5 digits')
      .max(5, 'Code must be 5 digits'),
  });

  const validateResetCode = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        {
          code,
          email,
        }
      );
      setVisible(3);
      setError('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='resetForm'>
      <div className='resetFormHeader'>Code verification</div>
      <div className='resetFormText'>
        Please enter the code sent to your email
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={codeValidation}
        onSubmit={() => validateResetCode()}>
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='code'
              onChange={(e) => setCode(e.target.value)}
              placeholder='Code'
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

export default CodeVerification;
