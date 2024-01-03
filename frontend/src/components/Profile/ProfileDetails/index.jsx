import React, { useEffect, useState } from 'react';
import './styles.css';
import Bio from './Bio';
import axios from 'axios';
import { useSelector } from 'react-redux';
const ProfileDetails = ({ detailss, visitor }) => {
  const [details, setDetails] = useState();

  useEffect(() => {
    setDetails(detailss);
  }, [detailss]);

  const initial = {
    bio: details?.bio ? details.bio : '',
    othername: details?.othername ? details.othername : '',
    job: details?.job ? details.job : 'Software developer',
    workplace: details?.workplace ? details.workplace : 'ReSys',
    highSchool: details?.highSchool
      ? details.highSchool
      : 'Treca gimnazija Sarajevo',
    college: details?.college
      ? details.college
      : 'Prirodno-matematicki fakultet u Sarajevu',
    currentCity: details?.currentCity ? details.currentCity : 'Sarajevo',
    hometown: details?.hometown ? details.hometown : '',
    relationship: details?.relationship ? details.relationship : '',
    instagram: details?.instagram ? details.instagram : '',
  };

  const [info, setInfo] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const handleBioChange = (e) => {
    console.log(e.target.value);
    setInfo({ ...info, bio: e.target.value });
  };

  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          info,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className='profileCard'>
      <div className='profileCardHeader'>Intro</div>
      {details?.bio && !showBio && (
        <div className='infoCol'>
          <span className='infoText'>{details?.bio}</span>
          {!visitor && (
            <button className='grayBtn hover2' onClick={() => setShowBio(true)}>
              Edit bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className='grayBtn hover2 w100'
          onClick={() => setShowBio(true)}>
          Add bio
        </button>
      )}
      {showBio && (
        <Bio
          info={info}
          handleChange={handleBioChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
        />
      )}
      {details?.job && details?.workplace ? (
        <div className='infoProfile'>
          <img src='../../../icons/job.png' alt='' />
          works as {details?.job} at<b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className='infoProfile'>
          <img src='../../../icons/job.png' alt='' />
          works as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className='infoProfile'>
            <img src='../../../icons/job.png' alt='' />
            works at {details?.workplace}
          </div>
        )
      )}
      {details?.relationship && (
        <div className='infoProfile'>
          <img src='../../../icons/relationship.png' alt='' />
          {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className='infoProfile'>
          <img src='../../../icons/studies.png' alt='' />
          studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className='infoProfile'>
          <img src='../../../icons/studies.png' alt='' />
          studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className='infoProfile'>
          <img src='../../../icons/home.png' alt='' />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className='infoProfile'>
          <img src='../../../icons/home.png' alt='' />
          From {details?.hometown}
        </div>
      )}
      {details?.hometown && (
        <div className='infoProfile'>
          <img src='../../../icons/instagram.png' alt='' />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target='_blank'
            rel='noreferrer'>
            {details?.instagram}
          </a>
        </div>
      )}
      {/* ABd implementirati */}
      {/* {!visitor && (
        <button className='grayBtn hover2 w100'>Edit details</button>
      )} */}
    </div>
  );
};

export default ProfileDetails;
