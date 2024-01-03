import { Link } from 'react-router-dom';
import './styles.css';
import Moment from 'react-moment';
import { Dots, Public } from '../../../svg';
import Reacts from './Reacts';
import { useEffect, useRef, useState } from 'react';
import Comments from './Comments';
import PostMenu from './PostMenu';
import { getReacts, reactPost } from '../../../helpers/post';
import SingleComment from './Comments/SingleComment';
const Post = ({ post, user, profile }) => {
  const postRef = useRef(null);
  const { createdAt, images, text, type } = post;
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [postReacts, setPostReacts] = useState([]);
  const [reacted, setReacted] = useState();
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  useEffect(() => {
    getPostReacts();
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);

    setPostReacts(res.reacts);
    setReacted(res.checkReact);
    setTotal(res.total);
  };

  const handleReact = async (type) => {
    reactPost(post._id, type, user.token);
    if (reacted === type) {
      setReacted();
      let index = postReacts.findIndex((x) => x.react === reacted);
      if (index !== -1) {
        setPostReacts([
          ...postReacts,
          (postReacts[index].count = --postReacts[index].count),
        ]);
        setTotal((prev) => --prev);
      }
    } else {
      setReacted(type);
      let index = postReacts.findIndex((x) => x.react === type);
      let index1 = postReacts.findIndex((x) => x.react === reacted);
      if (index !== -1) {
        setPostReacts([
          ...postReacts,
          (postReacts[index].count = ++postReacts[index].count),
        ]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setPostReacts([
          ...postReacts,
          (postReacts[index1].count = --postReacts[index1].count),
        ]);
        setTotal((prev) => --prev);
      }
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };
  return (
    <div
      className='post'
      style={{
        width: `${profile && '100%'}`,
      }}
      ref={postRef}>
      <div className='postHeader'>
        <Link to={`/profile/${post.user.username}`} className='postHeaderLeft'>
          <img src={post.user?.picture} alt='profile' />
          <div className='headerCol'>
            <div className='postProfileName'>
              {post.user?.first_name} {post.user?.last_name}
              <div className='updatedP'>
                {type === 'profilePicture' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his ' : 'her '
                  }profile picture`}
                {type === 'coverPicture' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his ' : 'her '
                  }cover picture`}
              </div>
            </div>
            <div className='postProfilePrivacyDate'>
              <Moment fromNow interval={30}>
                {createdAt}
              </Moment>
              <Public />
            </div>
          </div>
        </Link>
        <div
          className='postHeaderRight hover1'
          onClick={() => setShowMenu((prev) => !prev)}>
          <Dots />
        </div>
      </div>

      <>
        <div className='postText'>{text}</div>
        {post.type === null ? (
          images &&
          images.length && (
            <div
              className={
                images.length === 1
                  ? 'grid1'
                  : images.length === 2
                  ? 'grid2'
                  : images.length === 3
                  ? 'grid3'
                  : images.length === 4
                  ? 'grid4'
                  : images.length >= 5 && 'grid5'
              }>
              {images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt='' className={`img${i}`} />
              ))}
              {images.length > 5 && (
                <div className='morePictures'>+{images.length - 5}</div>
              )}
            </div>
          )
        ) : post.type === 'profilePicture' ? (
          <div className='postProfileWrap'>
            <div className='postUpdatedBg'>
              <img src={post.user.cover} alt='' />
            </div>
            <img src={post.images[0].url} alt='' className='postUpdatedPic' />
          </div>
        ) : (
          <div className='postCoverWrap'>
            <img src={post.images[0].url} alt='' />
          </div>
        )}
      </>
      <div className='postInfo'>
        <div className='reactCount'>
          <div className='reactCountImages'>
            {postReacts &&
              postReacts &&
              postReacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt=''
                        key={i}
                      />
                    )
                )}
          </div>
          <div className='reactCountNumber'>{total > 0 && total}</div>
        </div>
        <div className='toRight'>
          <div className='commentsCount'>{comments.length} comments</div>
        </div>
      </div>
      <div className='postActions'>
        <Reacts
          visible={visible}
          setVisible={setVisible}
          handleReact={handleReact}
        />

        <div
          className='postAction hover1'
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => {
            handleReact(reacted ? reacted : 'like');
          }}>
          {reacted ? (
            <img
              src={`../../../postReacts/${reacted}.svg`}
              alt=''
              style={{ width: '18px' }}
            />
          ) : (
            <i className='like_icon'></i>
          )}
          <span>{reacted ? reacted : 'Like'}</span>
        </div>
        <div className='postAction hover1'>
          <i className='comment_icon'></i>
          <span>Comment</span>
        </div>
        <div className='postAction hover1'>
          <i className='share_icon'></i>
          <span>Share</span>
        </div>
      </div>
      <div className='commentsWrap'>
        <div className='commentsOrder'></div>
        <Comments
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => <SingleComment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className='viewComments' onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          postId={post._id}
          userId={user.id}
          token={user.token}
          postUserId={post.user._id}
          hasImages={post?.images?.length}
          postRef={postRef}
        />
      )}
    </div>
  );
};

export default Post;
