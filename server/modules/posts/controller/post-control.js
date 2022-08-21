// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const posts = require("../model/post-model");
const users = require("../../users/model/user-model");
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
    let { postName, title, message, tags, file, filePath } = req.body;
    let { email } = req.decoded;
    let createdAt = new Date();

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      let newPost = new posts({
        creator: oldUser._id,
        postName,
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
        .json({ message: "Post created successfully", post: newPost });
    } else
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
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
    let { page } = req.query;
    page = Number(page);

    const limit = 2;
    let startIndex = (page - 1) * limit;

    const totalCount = await posts.countDocuments({});

    const data = await posts
      .find({ isDeleted: false })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);
    res
      .status(StatusCodes.OK)
      .json({ message: "Success", posts: data, totalCount });
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
    let { postName, title, message, tags, userId } = req.body;
    let { id } = req.params;
    let { email } = req.decoded;
    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      if (oldUser._id == userId) {
        const data = await posts.findByIdAndUpdate(
          id,
          {
            postName,
            title,
            message,
            tags,
          },
          {
            new: true,
          }
        );
        res.status(StatusCodes.OK).json({ message: "Success", post: data });
      } else
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Not Post Owner" });
    } else
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
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
    let { userId } = req.body;
    let { email } = req.decoded;
    let { id } = req.params;

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      if (oldUser._id == userId) {
        const data = await posts.findByIdAndDelete(id);
        res
          .status(StatusCodes.OK)
          .json({ message: "Post deleted successfully", post: data });
      } else
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Not Post Owner" });
    } else
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
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
    console.log(req.decoded);
    let { email } = req.decoded;

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      const oldPost = await posts.findById(id);
      if (oldPost) {
        let likes = oldPost.likeCount;
        if (likes.includes(oldUser._id)) {
          let index = likes.indexOf(oldUser._id);
          likes.splice(index, 1);
        } else likes.push(oldUser._id);
        const data = await posts.findByIdAndUpdate(
          id,
          {
            likeCount: likes,
          },
          {
            new: true,
          }
        );
        res
          .status(StatusCodes.OK)
          .json({ message: "Post Liked successfully", post: data });
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Post not found", post: "" });
    } else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User not found", post: "" });
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/*
//==// Search Post: is the logic of '/post/search/?searchQuery='value'&tags='value' api that used to search for specific post.
the response of this function in success (posts), in failure (show error message).
*/
const searchPost = async (req, res) => {
  try {
    let { titles, tags, page } = req.query;
    let { email } = req.decoded;

    page = Number(page);
    const limit = 10;
    let startIndex = (page - 1) * limit;

    tags = tags.split(",");
    titles = titles.split(",");

    console.log({ titles });
    console.log({ tags });

    let insensitiveTitles = [];
    titles.forEach(function (item) {
      var re = new RegExp(item, "i");
      insensitiveTitles.push(re);
    });

    let insensitiveTags = [];
    tags.forEach(function (item) {
      var re = new RegExp(item, "i");
      insensitiveTags.push(re);
    });

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      const totalCount = await posts.countDocuments({
        $or: [
          { title: { $in: insensitiveTitles } },
          { tags: { $in: insensitiveTags } },
        ],
      });

      const data = await posts
        .find({
          $or: [
            { title: { $in: insensitiveTitles } },
            { tags: { $in: insensitiveTags } },
          ],
        })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(startIndex);

      res
        .status(StatusCodes.OK)
        .json({ message: "Found Posts", posts: data, totalCount });
    } else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User not found", post: "" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

/*
//==// Get Post: is the logic of '/post/:id' api that used to get specific post by id.
the response of this function in success (data:post), in failure (show error message).
*/
const getPost = async (req, res) => {
  try {
    let { id } = req.params;
    let { email } = req.decoded;
    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      const data = await posts.findOne({ _id: id, isDeleted: false });
      res.status(StatusCodes.OK).json({ message: "Found Posts", post: data });
    } else
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/*
//==// Add Comment: is the logic of '/post/comment/:id' api that used to add comment to specific post.
the response of this function in success (data:post), in failure (show error message).
*/

const addComment = async (req, res) => {
  try {
    let { id } = req.params;
    let { email } = req.decoded;
    let { comment } = req.body;

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      const oldPost = await posts.findById(id);
      if (oldPost) {
        let comments = oldPost?.comments || [];
        comments.push(comment);
        const data = await posts.findByIdAndUpdate(
          id,
          {
            comments,
          },
          {
            new: true,
          }
        );
        res
          .status(StatusCodes.OK)
          .json({ message: "Add Comment Success", post: data });
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Post not found", post: "" });
    } else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User not found", post: "" });
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
  searchPost,
  getPost,
  addComment,
};
