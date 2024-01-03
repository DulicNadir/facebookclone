import EmojiPicker from 'emoji-picker-react';
import React, { useState, useEffect, useRef } from 'react';
import { ClipLoader } from 'react-spinners';

import './styles.css';
import { addComment } from '../../../../helpers/post';
import uriToBlob from '../../../../helpers/uriToBlob';
import { uploadImage } from '../../../../helpers/uploadImages';
const Comments = ({ user, postId, setComments, setCount }) => {
  const [picker, setPicker] = useState(false);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [cursorPosition, setCursorPosition] = useState();
  const [loading, setLoading] = useState(false);

  const commentRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    commentRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmojiClick = ({ emoji }) => {
    const ref = commentRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const textWithEmoji = start + emoji + end;
    setComment(textWithEmoji);
    setCursorPosition(start.length + emoji.length);
  };
  const pickImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/png' &&
      file.type !== 'image/gif' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg'
    ) {
      setError('Format is not supported');
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError('File too large');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      if (image != '') {
        setLoading(true);
        const img = uriToBlob(image);
        const path = `${user.username}/post_images/${postId}`;
        let formData = new FormData();
        formData.append('path', path);
        formData.append('file', img);
        const imgComment = await uploadImage(formData, path, user.token);

        const comments = await addComment(
          postId,
          comment,
          imgComment[0].url,
          user.token
        );
        setComments(comments);
        setCount((prev) => prev + 1);
        setLoading(false);
        setComment('');
        setImage('');
      } else {
        setLoading(true);

        const comments = await addComment(postId, comment, '', user.token);
        setComments(comments);
        setCount((prev) => prev + 1);
        setLoading(false);
        setComment('');
        setImage('');
      }
    }
  };
  return (
    <div className='createCommentContainer'>
      <div className='createComment'>
        <img src={user?.picture} alt='' />
        <div className='commentInputContainer'>
          {picker && (
            <div className='commentEmojiPicker'>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <input
            type='file'
            hidden
            ref={imageRef}
            accept='image/png, image/gif, image/jpeg image/jpg'
            onChange={pickImage}
          />
          {error && (
            <div className='postError commentError'>
              <div className='postErrorText'>{error}</div>
              <button className='blueBtn' onClick={() => setError('')}>
                Try again
              </button>
            </div>
          )}
          <input
            type='text'
            ref={commentRef}
            value={comment}
            placeholder='Write a comment...'
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={handleComment}
          />
          <div className='commentCircle' style={{ marginTop: '5px' }}>
            <ClipLoader size={20} color='#1876f2' loading={loading} />
          </div>

          <div
            className='openEmojiIcon hover2'
            onClick={() => setPicker((prev) => !prev)}>
            <i className='emoji_icon'></i>
          </div>
          <div
            className='openEmojiIcon hover2'
            onClick={() => imageRef.current.click()}>
            <i className='camera_icon'></i>
          </div>
        </div>
      </div>
      {image && (
        <div className='imagePreview'>
          <img src={image} alt='' />
          <div className='smallWhiteCircle' onClick={() => setImage('')}>
            <i className='exit_icon'></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
