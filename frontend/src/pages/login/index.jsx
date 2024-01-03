import './styles.css';
import Footer from '../../components/Login/Footer';

import { useState } from 'react';
import LoginForm from '../../components/Login/LoginForm';
import RegisterForm from '../../components/Register';

const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
};
export default Login;
