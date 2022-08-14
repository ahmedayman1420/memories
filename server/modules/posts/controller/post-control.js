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
    let { creator, title, message, tags, file, filePath } = req.body;
    let newPost = new posts({ creator, title, message, tags, file, filePath });
    await newPost.save();
    res
      .status(StatusCodes.CREATED)
      .json({ Message: "Post created successfully", post: newPost });
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
    const data = await posts.find({ isDeleted: false });
    res.status(StatusCodes.OK).json({ Message: "Success", posts: data });
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/*
//==// Edit Post: is the logic of '/post/edit/id' api that used to edit specific post.
the response of this function in success (data:post), in failure (show error message).
*/
const editPost = async (req, res) => {
  try {
    let { creator, title, message, tags } = req.body;
    let { id } = req.params;

    const data = await posts.findByIdAndUpdate(
      id,
      {
        creator,
        title,
        message,
        tags,
      },
      {
        new: true,
      }
    );
    res.status(StatusCodes.OK).json({ Message: "Success", post: data });
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  addPost,
  getPosts,
  editPost,
};
