// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const postFunctions = require("../controller/post-control");
const postSchemas = require("../joi/post-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const postEndpoints = require("../post-endpoints");
const isAuthorized = require("../../../Common/Middlewares/isAuthorized");
/*
//==// require express to create sub-object that will used to contains post apis
//==// postFunctions: it's an object that contains all post apis logic
//==// postSchemas: it's an object that contains all post apis schemas
//==// validateRequest: it's a function that used validate schema with sent request
//==// postEndpoints: it's an object that contains all post api endpoints
//==// isAuthorized: it's a funtion that checks the authority of the user
*/

// ====== --- ====== > Post Routes < ====== --- ====== //

// get posts api
router.get(
  "/posts",
  validateRequest(postSchemas.getPostsSchema),
  postFunctions.getPosts
);

// add post api
router.post(
  "/post/add",
  validateRequest(postSchemas.addPostSchema),
  isAuthorized(postEndpoints.AddPost),
  postFunctions.addPost
);

// edit post api
router.put(
  "/post/edit/:id",
  validateRequest(postSchemas.editPostSchema),
  isAuthorized(postEndpoints.editPost),
  postFunctions.editPost
);

// delete post api
router.delete(
  "/post/delete/:id",
  validateRequest(postSchemas.deletePostSchema),
  isAuthorized(postEndpoints.deletePost),
  postFunctions.deletePost
);

// like post api
router.patch(
  "/post/like/:id",
  validateRequest(postSchemas.likePostSchema),
  isAuthorized(postEndpoints.likePost),
  postFunctions.likePost
);

// search post api
router.get(
  "/post/search/",
  validateRequest(postSchemas.searchPostSchema),
  isAuthorized(postEndpoints.searchPost),
  postFunctions.searchPost
);

// get post by id api
router.get(
  "/post/detail/:id",
  validateRequest(postSchemas.getPostSchema),
  isAuthorized(postEndpoints.getPost),
  postFunctions.getPost
);

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
