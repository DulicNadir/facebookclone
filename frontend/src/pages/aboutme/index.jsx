import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './styles.css';

const AboutMe = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }
  const images = [
    'project1.png',
    'project2.png',
    'project3.png',
    'project4.png',
  ];
  return (
    <div>
      <div className='languageButtons'>
        <button className='blueBtn' onClick={changeLanguage} value='en'>
          English
        </button>
        <button className='blueBtn' onClick={changeLanguage} value='ba'>
          Bosnian
        </button>
      </div>
      <div className='aboutMe'>
        <div className='aboutMeHeader'>
          <h3>{t('aboutMe')}</h3>
          <Link to='/'>
            <button className='grayBtn hover3'>{t('backToHome')}</button>
          </Link>
        </div>
        <div className='moreAboutMe'>
          <div className='moreAboutMeText'>
            <p>{t('introAboutMe')}</p>
            <p>{t('mySkills')}</p>
          </div>
          <div>
            <img
              src='../../../images/nadir.jpeg'
              alt=''
              width='190px'
              height='190px'
            />
          </div>
        </div>
        <div className='hr'></div>
        <div className='projectImages'>
          {images.map((image, index) => (
            <img
              key={index}
              src={`../../../images/${image}`}
              alt=''
              width='150px'
              height='150px'
            />
          ))}
        </div>
        <div className='hr'></div>
        <div>
          <div className='moreAboutMeText'>
            <p>{t('moreAboutMe')}</p>
          </div>
          <p>{t('kontakt')}</p>
          <div className='contactMe'>
            <div className='hr'></div>
            <a
              href='https://www.linkedin.com/in/nadir-dulic-6a35561b9'
              target='_blank'
              rel='noreferrer'>
              LinkedIn
            </a>
            <a href='mailto:dulicnadir@gmail.com?subject=SweetWords&body=Interested to work together!'>
              Email Me
            </a>
          </div>
          <p>{t('pageTranslated')}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
