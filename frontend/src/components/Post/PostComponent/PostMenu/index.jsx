import { deletePost } from '../../../../helpers/post';
import MenuItem from './MenuItem';
import './styles.css';
import { userPostData } from './userPostData';

const PostMenu = ({
  userId,
  postUserId,
  hasImages,
  postId,
  token,
  postRef,
}) => {
  const isSameUser = userId === postUserId;
  const handleDelete = async () => {
    const res = await deletePost(postId, token);
    if (res === 'Izbrisao') {
      postRef.current.remove();
    }
  };
  return (
    <ul className='postMenu'>
      {isSameUser &&
        userPostData.map((item, i) => {
          if (i === userPostData.length - 1) {
            return (
              <MenuItem key={i} {...item} onClick={() => handleDelete()} />
            );
          } else {
            return <MenuItem key={i} {...item} />;
          }
        })}
    </ul>
  );
};

export default PostMenu;
