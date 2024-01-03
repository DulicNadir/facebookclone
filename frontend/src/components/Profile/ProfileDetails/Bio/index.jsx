import React from 'react';
import './styles.css';
const Bio = ({ info, handleChange, setShowBio, updateDetails }) => {
  return (
    <div className='addBioContainer'>
      <textarea
        className='textAreaBlue detailsInput'
        name='bio'
        value={info?.bio}
        placeholder='Add bio'
        maxLength={120}
        onChange={handleChange}></textarea>
      <div className='flex'>
        <button className='grayBtn' onClick={() => setShowBio(false)}>
          Cancel
        </button>
        <button className='blueBtn' onClick={() => updateDetails()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Bio;
