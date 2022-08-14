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
    let createdAt = new Date();
    let newPost = new posts({
      creator,
      title,
      message,
      tags,
      file,
      filePath,
      createdAt,
    });
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

/*
//==// Delete Post: is the logic of '/post/delete/:id' api that used to delete specific post.
the response of this function in success ("Post deleted successfully"), in failure (show error message).
*/
const deletePost = async (req, res) => {
  try {
    let { id } = req.params;

    const data = await posts.findByIdAndDelete(id);
    res
      .status(StatusCodes.OK)
      .json({ Message: "Post deleted successfully", post: data });
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/*
//==// Like Post: is the logic of '/post/like/:id' api that used to Like specific post.
the response of this function in success (updated post), in failure (show error message).
*/
const likePost = async (req, res) => {
  try {
    let { id } = req.params;
    const oldPost = await posts.findById(id);
    if (oldPost) {
      const data = await posts.findByIdAndUpdate(
        id,
        {
          likeCount: oldPost.likeCount + 1,
        },
        {
          new: true,
        }
      );
      res
        .status(StatusCodes.OK)
        .json({ Message: "Post Liked successfully", post: data });
    } else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "Post not found", post: "" });
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
  deletePost,
  likePost,
};
