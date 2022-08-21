// ====== --- ====== > Post module endpoints < ====== --- ====== //
const AddPost = "Post:AddPost";
const editPost = "Post:editPost";
const deletePost = "Post:deletePost";
const likePost = "Post:likePost";
const searchPost = "Post:searchPost";
const getPost = "Post:getPost";
const addComment = "Post:addComment";

const postEndpoints = {
  AddPost,
  editPost,
  deletePost,
  likePost,
  searchPost,
  getPost,
  addComment,
};

// ====== --- ====== > Export post endpoints < ====== --- ====== //
module.exports = postEndpoints;
