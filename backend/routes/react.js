const express = require('express');
const {
  reactPost,
  getReacts,
  deleteAllReacts,
} = require('../controllers/react');
const { authUser } = require('../middleware/auth');
const router = express.Router();

module.exports = router;

router.put('/reactPost', authUser, reactPost);
router.get('/getReacts/:id', authUser, getReacts);
router.delete('/deleteAllReacts', deleteAllReacts);
