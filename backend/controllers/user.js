const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/tokens');
const { sendVerification } = require('../helpers/mailer');
const { generateCode } = require('../helpers/generateCode');
const { sendResetCode } = require('../helpers/mailer');
const Code = require('../models/Code');
const Post = require('../models/Post');

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
      password,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email address.',
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: 'Email address already exists.',
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'First name must be between 3 and 30 characters.',
      });
    }
    if (!validateLength(last_name, 2, 30)) {
      return res.status(400).json({
        message: 'Last name must be between 2 and 30 characters.',
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'Password must be between 6 and 40 characters.',
      });
    }

    const cryptedPass = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
      password: cryptedPass,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerification(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Register succesful, please activate your email.',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.activateAcc = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const checkUser = await User.findById(user.id);

    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation",
      });
    }
    if (checkUser.verified == true) {
      return res.status(400).json({ message: 'Email is already activated.' });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: 'Email succesfully activated !' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.status(400).json({
        message: "User with this email doesn't exist, please try again.",
      });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: 'Wrong password, please try again.',
      });
    }
    const token = generateToken({ id: checkUser._id.toString() }, '7d');
    res.send({
      id: checkUser._id,
      username: checkUser.username,
      picture: checkUser.picture,
      first_name: checkUser.first_name,
      last_name: checkUser.last_name,
      token: token,
      verified: checkUser.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).select('-password');
    if (!user) {
      return res.status(400).json({
        message: "User with this email doesn't exist.",
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).select('-password');
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    const savedCode = await new Code({
      code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: 'Code sent succesfully.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email }).select('-password');
    const checkCode = await Code.findOne({ user: user._id });
    if (checkCode.code !== code) {
      return res.status(400).json({
        message: 'Verificaton code is wrong.',
      });
    }
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const crypedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email },
      {
        password: crypedPassword,
      }
    );
    return res.status(200).json({
      message: 'Password changed.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user.id);

    const profile = await User.findOne({ username: username }).select(
      '-password'
    );
    const friendship = {
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    };
    if (!profile) return res.json({ userCheck: false });

    if (
      user.friends.includes(profile._id) &&
      profile.friends.includes(user._id)
    ) {
      friendship.friends = true;
    }
    if (user.following.includes(profile._id)) {
      friendship.following = true;
    }
    if (user.requests.includes(profile._id)) {
      friendship.requestReceived = true;
    }
    if (profile.requests.includes(user._id)) {
      friendship.requestSent = true;
    }

    const posts = await Post.find({ user: profile._id })
      .populate('user')
      .populate(
        'comments.commentBy',
        'first_name last_name picture username commentAt'
      )
      .sort({ createdAt: -1 });
    await profile.populate('friends', 'first_name last_name username picture');
    await profile.populate('requests');
    res.json({ ...profile.toObject(), posts, friendship });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateCoverPicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.removeCoverPicture = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      cover: '',
    });
    res.json('Cover picture removed');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.removeProfilePicture = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      picture:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
    });
    res.json('Profile picture removed');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const { info } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: info,
      },
      {
        new: true,
      }
    );
    //vraca novi updated value, ne stari

    res.json(updated.details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addFriend = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        !receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        await receiver.updateOne({
          $push: { requests: sender._id },
        });
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: receiver._id },
        });
        res.json({ message: 'Friend request has been sent' });
      } else {
        return res.status(400).json({ message: 'Already sent' });
      }
    } else {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.cancelRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        await receiver.updateOne({
          $pull: { requests: sender._id },
        });
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });
        await sender.updateOne({
          $pull: { following: receiver._id },
        });
        res.json({ message: 'you successfully canceled request' });
      } else {
        return res.status(400).json({ message: 'Already Canceled' });
      }
    } else {
      return res
        .status(400)
        .json({ message: "You can't cancel a request to yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.follow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $push: { followers: sender._id },
        });

        await sender.updateOne({
          $push: { following: receiver._id },
        });
        res.json({ message: 'follow success' });
      } else {
        return res.status(400).json({ message: 'Already following' });
      }
    } else {
      return res.status(400).json({ message: "You can't follow yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.unfollow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });

        await sender.updateOne({
          $pull: { following: receiver._id },
        });
        res.json({ message: 'unfollow success' });
      } else {
        return res.status(400).json({ message: 'Already not following' });
      }
    } else {
      return res.status(400).json({ message: "You can't unfollow yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.acceptRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $push: { friends: sender._id, following: sender._id },
        });
        await sender.updateOne({
          $push: { friends: receiver._id, followers: receiver._id },
        });
        await receiver.updateOne({
          $pull: { requests: sender._id },
        });
        res.json({ message: 'friend request accepted' });
      } else {
        return res.status(400).json({ message: 'Already friends' });
      }
    } else {
      return res
        .status(400)
        .json({ message: "You can't accept a request from  yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.unfriend = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        receiver.friends.includes(sender._id) &&
        sender.friends.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: {
            friends: sender._id,
            following: sender._id,
            followers: sender._id,
          },
        });
        await sender.updateOne({
          $pull: {
            friends: receiver._id,
            following: receiver._id,
            followers: receiver._id,
          },
        });

        res.json({ message: 'unfriend request accepted' });
      } else {
        return res.status(400).json({ message: 'Already not friends' });
      }
    } else {
      return res.status(400).json({ message: "You can't unfriend yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $pull: {
            requests: sender._id,
            followers: sender._id,
          },
        });
        await sender.updateOne({
          $pull: {
            following: receiver._id,
          },
        });

        res.json({ message: 'delete request accepted' });
      } else {
        return res.status(400).json({ message: 'Already deleted' });
      }
    } else {
      return res.status(400).json({ message: "You can't delete yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
