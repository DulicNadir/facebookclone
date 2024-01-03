const express = require('express');
const {
  register,
  activateAcc,
  login,
  findUser,
  sendCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
  updateCoverPicture,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest,
  removeCoverPicture,
  removeProfilePicture,
} = require('../controllers/user');
const { authUser } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/activate', authUser, activateAcc);
router.post('/login', login);
router.post('/findUser', findUser);
router.post('/sendResetCode', sendCode);
router.post('/validateResetCode', validateResetCode);
router.post('/changePassword', changePassword);
router.get('/getProfile/:username', authUser, getProfile);
router.put('/updateProfilePicture', authUser, updateProfilePicture);
router.put('/updateCoverPicture', authUser, updateCoverPicture);
router.put('/updateDetails', authUser, updateDetails);
router.put('/addFriend/:id', authUser, addFriend);
router.put('/cancelRequest/:id', authUser, cancelRequest);
router.put('/follow/:id', authUser, follow);
router.put('/unfollow/:id', authUser, unfollow);
router.put('/acceptRequest/:id', authUser, acceptRequest);
router.put('/unfriend/:id', authUser, unfriend);
router.put('/deleteRequest/:id', authUser, deleteRequest);
router.put('/removeCoverPicture/', authUser, removeCoverPicture);
router.put('/removeProfilePicture/', authUser, removeProfilePicture);

module.exports = router;
