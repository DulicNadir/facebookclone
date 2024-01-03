import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../helpers/clickAway';
import './styles.css';
import { useSelector } from 'react-redux';
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from '../../../helpers/userRelations';
export default function Friendship({ friendshipp, profileId }) {
  const [friendship, setFriendship] = useState(friendshipp);
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menu = useRef(null);
  const menu1 = useRef(null);
  useClickOutside(menu, () => setFriendsMenu(false));
  useClickOutside(menu1, () => setRespondMenu(false));
  const { user } = useSelector((state) => ({ ...state }));
  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(profileId, user.token);
  };
  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelRequest(profileId, user.token);
  };
  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileId, user.token);
  };
  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(profileId, user.token);
  };
  const acceptRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await acceptRequest(profileId, user.token);
  };
  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await unfriend(profileId, user.token);
  };
  const deleteRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await deleteRequest(profileId, user.token);
  };

  return (
    <div className='friendship'>
      {friendship?.friends ? (
        <div className='friendsMenuContainer'>
          <button className='grayBtn' onClick={() => setFriendsMenu(true)}>
            <img src='../../../../icons/friends.png' alt='' />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className='openCoverMenu' ref={menu}>
              {friendship?.following ? (
                <div
                  className='openCoverMenuItem hover1'
                  onClick={() => unfollowHandler()}>
                  <img src='../../../../icons/unfollowOutlined.png' alt='' />
                  Unfollow
                </div>
              ) : (
                <div
                  className='openCoverMenuItem hover1'
                  onClick={() => followHandler()}>
                  <img src='../../../../icons/unfollowOutlined.png' alt='' />
                  Follow
                </div>
              )}
              <div
                className='openCoverMenuItem hover1'
                onClick={() => unfriendHandler()}>
                <i className='unfriend_outlined_icon'></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className='blueBtn' onClick={() => addFriendHandler()}>
            <img
              src='../../../../icons/addFriend.png'
              alt=''
              className='invert'
            />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className='blueBtn' onClick={() => cancelRequestHandler()}>
          <img
            src='../../../../icons/cancelRequest.png'
            className='invert'
            alt=''
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className='friendsMenuContainer'>
            <button className='grayBtn' onClick={() => setRespondMenu(true)}>
              <img src='../../../../icons/friends.png' alt='' />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className='openCoverMenu' ref={menu1}>
                <div
                  className='openCoverMenuItem hover1'
                  onClick={() => acceptRequestHanlder()}>
                  Confirm
                </div>
                <div
                  className='openCoverMenuItem hover1'
                  onClick={() => deleteRequestHanlder()}>
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.following ? (
        <button className='grayBtn' onClick={() => unfollowHandler()}>
          <img src='../../../../icons/follow.png' alt='' />
          <span>Following</span>
        </button>
      ) : (
        <button className='blueBtn' onClick={() => followHandler()}>
          <img src='../../../../icons/follow.png' className='invert' alt='' />
          <span>Follow</span>
        </button>
      )}
    </div>
  );
}
