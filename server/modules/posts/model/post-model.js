// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > Post schema < ====== --- ====== //
/*
//==// postSchema: it contains fields of post collection with some restrictions like
(required, max, min) and some options like (default value, enum).
post fields is [title, message, creator, tags, selectedFile, likeCount, createdAt, isDeleted].
*/
const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    message: {
      type: String,
      required: true,
    },
    creator: { type: String, required: true }, // relate this field with user collection
    tags: [{ type: String, required: true }],
    file: { type: String, required: true },
    filePath: { type: String, required: true },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > post model < ====== --- ====== //
const posts = mongoose.model("posts", postSchema); // create post collection with given (name, schema).

// ====== --- ====== > export post model < ====== --- ====== //
module.exports = posts;
