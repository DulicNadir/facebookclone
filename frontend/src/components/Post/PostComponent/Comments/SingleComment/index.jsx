import Moment from 'react-moment';
import './styles.css';
export default function Comment({ comment }) {
  return (
    <div className='singleComment'>
      <img src={comment.commentBy.picture} alt='' className='commentImg' />
      <div className='commentCol'>
        <div className='commentWrap'>
          <div className='commentName'>
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </div>
          <div className='commentText'>{comment.comment}</div>
        </div>
        {comment.image && (
          <img src={comment.image} alt='' className='commentImage' />
        )}
        <div className='commentActions'>
          <span>Like</span>
          <span>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
