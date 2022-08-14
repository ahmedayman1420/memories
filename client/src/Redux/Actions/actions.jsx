import { editPostAPI, getAllPosts, submitPost } from "../../APIs/APIs";

export const addPost = (post) => async (dispatch) => {
  const res = await submitPost(post);
  dispatch({
    type: "ADD_POST",
    payload: res.data.post,
  });
};

export const getPosts = () => async (dispatch) => {
  const res = await getAllPosts();
  dispatch({
    type: "GET_POSTS",
    payload: res.data.posts,
  });
};

export const editPost = (post) => async (dispatch) => {
  const res = await editPostAPI(post);
  dispatch({
    type: "EDIT_POST",
    payload: res.data.post,
  });
};

export const setEditPostId = (id) => async (dispatch) => {
  dispatch({
    type: "EDIT_POST_ID",
    payload: id,
  });
};
export const resetId = () => async (dispatch) => {
  dispatch({
    type: "RESET_ID",
  });
};

export const unexpectedError = (mes) => async (dispatch) => {
  dispatch({
    type: mes,
    payload: { value: true, message: mes },
  });
};

export const errorReset = () => async (dispatch) => {
  dispatch({
    type: "ERROR_RESET",
    payload: { value: false, message: "All is good" },
  });
};
