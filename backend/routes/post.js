const express = require('express');
const {
  createPost,
  getPosts,
  deleteAllPosts,
  comment,
  deletePost,
} = require('../controllers/post');
const { authUser } = require('../middleware/auth');
const router = express.Router();

router.post('/createPost', authUser, createPost);
router.get('/getAllPosts', authUser, getPosts);
//funkcija za postmana
router.delete('/deleteAllPosts', deleteAllPosts);
router.delete('/deletePost/:id', authUser, deletePost);
router.put('/comment', authUser, comment);

module.exports = router;
