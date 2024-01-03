const React = require('../models/React');
const mongoose = require('mongoose');
exports.reactPost = async (req, res) => {
  try {
    const { postID, react } = req.body;
    const reactExist = await React.findOne({
      postRef: postID,
      reactBy: mongoose.Types.ObjectId(req.user.id),
    });
    if (reactExist === null) {
      const newReact = await new React({
        postRef: postID,
        reactBy: mongoose.Types.ObjectId(req.user.id),
        react,
      }).save();
      return res.json(newReact);
    } else {
      if (reactExist.react === react) {
        await React.findByIdAndRemove(reactExist._id);
      } else {
        await React.findByIdAndUpdate(reactExist._id, { react });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getReacts = async (req, res) => {
  try {
    const reactsArray = await React.find({ postRef: req.params.id });
    const newReacts = reactsArray.reduce((acc, react) => {
      let key = react['react'];
      acc[key] = acc[key] || [];
      acc[key].push(react);
      return acc;
    }, {});

    const reacts = [
      {
        react: 'like',
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: 'love',
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: 'haha',
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: 'sad',
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: 'wow',
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: 'angry',
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];

    const checkReact = await React.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });

    return res.json({
      reacts,
      checkReact: checkReact?.react,
      total: reactsArray.length,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteAllReacts = async (req, res) => {
  try {
    await React.deleteMany({});
    return res.json({ message: 'Delete all posts successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
