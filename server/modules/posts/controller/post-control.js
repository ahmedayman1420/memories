// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const posts = require("../model/post-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// ====== --- ====== > Post Methods < ====== --- ====== //

/*
//==// Add Post: is the logic of '/post/add' api that used to create new post with required fields.
the response of this function in success (Post created successfully), in failure (show error message).
*/
const addPost = async (req, res) => {
  try {
    let { creator, title, message, tags, file } = req.body;
    let newPost = new posts({ creator, title, message, tags, file });
    await newPost.save();
    res
      .status(StatusCodes.CREATED)
      .json({ Message: "Post created successfully", data: {} });
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/*
//==// Get Posts: is the logic of '/posts' api that used to get dashboard posts.
the response of this function in success (data:posts), in failure (show error message).
*/
const getPosts = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ Message: "Success", data: {} });
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  addPost,
  getPosts,
};
