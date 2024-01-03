import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Footer from '../../components/Login/Footer';
import SearchAccount from '../../components/ResetPasswordComponent/SearchAccount';
import ResetPassword from '../../components/ResetPasswordComponent/ResetPassword';
import CodeVerification from '../../components/ResetPasswordComponent/CodeVerification';
import ChangePassword from '../../components/ResetPasswordComponent/ChangePassword';
const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(0);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confPassword, setConfPassword] = useState('');
  const [code, setCode] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/login');
  };

  return (
    <div className='resetContainer'>
      <div className='resetHeader'>
        <img src='../../../icons/facebook.svg' alt='' />
        {user ? (
          <div className='rightReset'>
            <Link to='/profile'>
              <img src={user?.picture} alt='' />
            </Link>
            <button className='blueBtn' onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='rightReset'>
            <button className='blueBtn'>Login</button>
          </Link>
        )}
      </div>
      <div className='resetWrap'>
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfo && (
          <ResetPassword
            userInfo={userInfo}
            email={email}
            setVisible={setVisible}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            email={email}
            setVisible={setVisible}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            setPassword={setPassword}
            confPassword={confPassword}
            setConfPassword={setConfPassword}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
