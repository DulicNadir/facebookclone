import React from 'react';

const Settings = ({ setVisible }) => {
  return (
    <div className='wrap'>
      <div className='wrapHeader'>
        <div
          className='circle hover1'
          onClick={() => {
            setVisible(0);
          }}>
          <i className='arrow_back_icon'></i>
        </div>
        Settings & privacy
      </div>
      <div className='mmenuItem hover3'>
        <div className='smallCircle'>
          <i className='settings_filled_icon'></i>
        </div>
        <span>Settings</span>
      </div>
      <div className='mmenuItem hover3'>
        <div className='smallCircle'>
          <i className='language_icon'></i>
        </div>
        <span>Language</span>
      </div>
      <div className='mmenuItem hover3'>
        <div className='smallCircle'>
          <i className='privacy_checkup_icon'></i>
        </div>
        <span>Privacy checkup</span>
      </div>
      <div className='mmenuItem hover3'>
        <div className='smallCircle'>
          <i className='privacy_shortcuts_icon'></i>
        </div>
        <span>Privacy shorycuts</span>
      </div>
      <div className='mmenuItem hover3'>
        <div className='smallCircle'>
          <i className='activity_log_icon'></i>
        </div>
        <span>Activity log</span>
      </div>
      <div className='mmenuItem hover3'>
        <div className='smallCircle'>
          <i className='news_icon'></i>
        </div>
        <span>News Feed Preferences</span>
      </div>
    </div>
  );
};

export default Settings;
