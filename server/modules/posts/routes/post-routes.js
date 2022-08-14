// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const postFunctions = require("../controller/post-control");
const postSchemas = require("../joi/post-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
// const userEndpoints = require("../endpoints");
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
  //   validateRequest(userSchemas.signupSchema),
  postFunctions.getPosts
);

// add post api
router.post(
  "/post/add",
  validateRequest(postSchemas.addPostSchema),
  postFunctions.addPost
);

// edit post api
router.put(
  "/post/edit/:id",
  validateRequest(postSchemas.editPostSchema),
  postFunctions.editPost
);

// delete post api
router.delete(
  "/post/delete/:id",
  validateRequest(postSchemas.deletePostSchema),
  postFunctions.deletePost
);

// like post api
router.patch(
  "/post/like/:id",
  validateRequest(postSchemas.likePostSchema),
  postFunctions.likePost
);

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
