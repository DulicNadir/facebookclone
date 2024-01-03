import { Feeling, LiveVideo, Photo } from '../../../svg';
import './styles.css';
const CreatePost = ({ user, setSeePostPopup }) => {
  return (
    <div className='createPost'>
      <div className='createPostHeader'>
        <img src={user?.picture} alt='' />
        <div className='openPost hover2' onClick={() => setSeePostPopup(true)}>
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className='hr'></div>
      <div className='createPostBody'>
        <div className='createPostIcon hover1'>
          <LiveVideo color='#F3425f' />
          Live video
        </div>
        <div className='createPostIcon hover1'>
          <Photo color='#4bbf67' />
          Photo/Video
        </div>
        <div className='createPostIcon hover1'>
          <Feeling color='#f7b928' />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
