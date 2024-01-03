import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import LoggedIn from './routes/LoggedIn';
import NotLoggedIn from './routes/NotLoggedIn';
import Activate from './pages/home/activate';
import Reset from './pages/reset';
import { useState } from 'react';
import AboutMe from './pages/aboutme';
import './i18n/config';

function App() {
  const [seePostPopup, setSeePostPopup] = useState(false);
  return (
    <div>
      <Routes>
        <Route element={<LoggedIn />}>
          <Route
            path='/'
            element={
              <Home
                setSeePostPopup={setSeePostPopup}
                seePostPopup={seePostPopup}
              />
            }
            exact
          />
          <Route
            path='/profile'
            element={
              <Profile
                setSeePostPopup={setSeePostPopup}
                seePostPopup={seePostPopup}
              />
            }
            exact
          />
          <Route
            path='/profile/:username'
            element={<Profile setSeePostPopup={setSeePostPopup} />}
            exact
          />
          <Route path='/activate/:token' element={<Activate />} exact />
          <Route path='/aboutme' element={<AboutMe />} exact />
        </Route>
        <Route element={<NotLoggedIn />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} exact />
      </Routes>
    </div>
  );
}

export default App;
