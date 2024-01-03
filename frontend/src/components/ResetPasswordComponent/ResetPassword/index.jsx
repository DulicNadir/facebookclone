import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
const ResetPassword = ({
  userInfo,
  error,
  setError,
  setVisible,
  setUserInfo,
  loading,
  email,
  setLoading,
}) => {
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendResetCode`, {
        email,
      });
      setError('');
      setVisible(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='resetForm dynamic'>
      <div className='resetFormHeader'>Reset your password</div>
      <div className='resetGrid'>
        <div className='resetLeft'>
          <div className='resetFormText'>
            How do you want to recieve the code to reset your password ?
          </div>
          <label htmlFor='email' className='hover1'>
            <input type='radio' name='' id='email' checked readOnly />
            <div className='labelCol'>
              <span>Send code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        <div className='resetRight'>
          <img src={userInfo.picture} alt='' />
          <span>{userInfo.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      <div className='resetFormButtons'>
        <Link to='/login' className='grayBtn'>
          Not you ?
        </Link>
        <button
          onClick={() => {
            sendEmail();
          }}
          className='blueBtn'>
          Continue
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
