import React, { useRef } from 'react';
import './styles.css';
import EmojiPicker from '../EmojiPicker';
import AddToPost from '../AddToPost';
import ImagePreview from '../ImagePreview';
import { useClickOutside } from '../../../helpers/clickAway';
import { createPost } from '../../../helpers/post';
import PulseLoader from 'react-spinners/PulseLoader';
import PostError from '../PostError';
import uriToBlob from '../../../helpers/uriToBlob';
import { uploadImage } from '../../../helpers/uploadImages';
const CreatePostPopup = ({
  user,
  setSeePostPopup,
  posts,
  dispatch,
  profile,
}) => {
  const [text, setText] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [background, setBackground] = React.useState('');
  const [error, setError] = React.useState('');
  const [images, setImages] = React.useState([]);
  const popupRef = useRef(null);

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === 'Zavrsio') {
        dispatch({
          type: profile ? 'PROFILE_POSTS' : 'POSTS_SUCCESS',
          payload: [response.data, ...posts],
        });
        setBackground('');
        setText('');
        setSeePostPopup(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return uriToBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append('path', path);
      postImages.forEach((image) => {
        formData.append('file', image);
      });
      const response = await uploadImage(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.status === 'Zavrsio') {
        dispatch({
          type: profile ? 'PROFILE_POSTS' : 'POSTS_SUCCESS',
          payload: [res.data, ...posts],
        });
        setText('');
        setImages('');
        setSeePostPopup(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === 'Zavrsio') {
        dispatch({
          type: profile ? 'PROFILE_POSTS' : 'POSTS_SUCCESS',
          payload: [response.data, ...posts],
        });
        setBackground('');
        setText('');
        setSeePostPopup(false);
      } else {
        setError(response);
      }
    } else {
      console.log('Nista');
    }
  };

  useClickOutside(popupRef, () => {
    setSeePostPopup(false);
  });
  return (
    <div className='blur'>
      <div className='postBox' ref={popupRef}>
        {error && <PostError error={error} setError={setError} />}
        <div className='postBoxHeader'>
          <div className='smallCircle' onClick={() => setSeePostPopup(false)}>
            <i className='exit_icon'></i>
          </div>
          <span>Create post</span>
        </div>
        <div className='boxProfile'>
          <img src={user?.picture} alt='' className='boxProfileImg' />
          <div className='boxCol'>
            <div className='boxProfileName'>
              {user?.first_name} {user?.last_name}
            </div>
            <div className='boxPrivacy'>
              <img src='../../../icons/public.png' alt='' />
              <span>Public</span>
              <i className='arrowDown_icon'></i>
            </div>
          </div>
        </div>

        {!show ? (
          <div>
            <EmojiPicker text={text} setText={setText} user={user} />
          </div>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            images={images}
            setImages={setImages}
            setShow={setShow}
            setError={setError}
          />
        )}

        <AddToPost setShow={setShow} />
        <button
          className='postBtn'
          onClick={() => postSubmit()}
          disabled={loading}>
          {loading ? <PulseLoader color='#fff' size={10} /> : <span>Post</span>}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
