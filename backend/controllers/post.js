const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    await post.populate('user', 'first_name last_name cover picture username');
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'first_name last_name picture username gender')
      .populate('comments.commentBy', 'first_name last_name picture username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json('Izbrisao');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteAllPosts = async (req, res) => {
  try {
    await Post.deleteMany();
    res.json('Deleted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.comment = async (req, res) => {
  try {
    const { comment, image, postId } = req.body;
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            image: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate('comments.commentBy', 'picture first_name last_name username');
    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
