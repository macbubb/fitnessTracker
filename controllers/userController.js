const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//You can POST to /api/users with form data username to create a new user.
const registerUser = asyncHandler(async (req, res) => {
  const { username } = req.body; // works with urlencoded content
  if (!username) {
    username = req.body.username;
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error(`${username} username already exists.`);
  }

  const user = await User.create({ username });

  // The returned response from POST /api/users with form data username will be an object with username and _id properties.
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// You can make a GET request to /api/users to get a list of all users.
const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { __v: 0 });
  // The GET request to /api/users returns an array.
  res.json(users);
});

// Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.

//delete function for house cleaning
const deleteAllUsers = asyncHandler(async (req, res) => {
  const deletedUsers = await User.deleteMany({});
  if (deletedUsers) {
    res.json(deletedUsers);
  } else {
    res.status(400);
    throw new Error('Delete operation failed');
  }
});

const deleteOneUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await User.deleteOne({ _id: userId });
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404);
    throw new Error(`${userId} not found`);
  }
});

const deleteOneUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const deletedUser = await User.deleteOne({ username });
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404);
    throw new Error(`${username} not found`);
  }
});

exports.registerUser = registerUser;
exports.listUsers = listUsers;
exports.deleteAllUsers = deleteAllUsers;
exports.deleteOneUserById = deleteOneUserById;
exports.deleteOneUserByUsername = deleteOneUserByUsername;
