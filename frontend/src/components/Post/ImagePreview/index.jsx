import React, { useRef } from 'react';
import './styles.css';
import EmojiPicker from '../EmojiPicker';

const ImagePreview = ({
  text,
  setText,
  user,
  showPicker,
  setShowPicker,
  images,
  setImages,
  setShow,
  setError,
}) => {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/jpg' &&
        img.type !== 'image/gif' &&
        img.type !== 'image/webp'
      ) {
        setError('Only images are allowed');
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result]);
      };
    });
  };
  return (
    <div className='overflow scrollbar'>
      <EmojiPicker
        text={text}
        setText={setText}
        user={user}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        type2
      />
      <div className='addPictureContainer'>
        <input
          type='file'
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
          accept='image/*'
        />
        {images && images.length ? (
          <div className='addImages p0'>
            <div className='previewActions'>
              <button className='hover2'>
                <i className='edit_icon'></i>Edit
              </button>
              <button
                className='hover2'
                onClick={() => {
                  imageInputRef.current.click();
                }}>
                <i className='addPhoto_icon'></i>Add photos/videos
              </button>
            </div>
            <div className='smallWhiteCircle' onClick={() => setImages([])}>
              <i className='exit_icon'></i>
            </div>
            <div
              className={
                images.length === 1
                  ? 'previewOne'
                  : images.length === 2
                  ? 'previewTwo'
                  : images.length === 3
                  ? 'previewThree'
                  : images.length === 4
                  ? 'previewFour'
                  : images.length === 5
                  ? 'previewFive'
                  : images.length % 2 === 0
                  ? 'previewAll'
                  : 'previewAll singlePicture'
              }>
              {images.map((img, i) => (
                <img src={img} alt='' key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className='addImages'>
            <div className='smallWhiteCircle' onClick={() => setShow(false)}>
              <i className='exit_icon'></i>
            </div>
            <div
              className='addCol'
              onClick={() => {
                imageInputRef.current.click();
              }}>
              <div className='addCircle'>
                <i className='addPhoto_icon'></i>
              </div>
              <span>Add photos/videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
