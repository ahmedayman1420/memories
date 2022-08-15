import {
  deletePostAPI,
  editPostAPI,
  getAllPostsAPI,
  likePostAPI,
  addPostAPI,
  signInAPI,
  signUpAPI,
  googleSigninAPI,
} from "../../APIs/APIs";
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  EDIT_POST_ID,
  ERROR_RESET,
  GET_POSTS,
  GOOGLE_AUTH,
  LIKE_POST,
  LOGOUT,
  RESET_ID,
  SIGNIN,
  SIGNUP,
} from "./actionStrings";

export const addPostAction = (post) => async (dispatch) => {
  const res = await addPostAPI(post);
  dispatch({
    type: ADD_POST,
    payload: res.data.post,
  });
};

export const getPostsAction = () => async (dispatch) => {
  const res = await getAllPostsAPI();
  dispatch({
    type: GET_POSTS,
    payload: res.data.posts,
  });
};

export const editPostACtion = (post) => async (dispatch) => {
  const res = await editPostAPI(post);
  dispatch({
    type: EDIT_POST,
    payload: res.data.post,
  });
};

export const likePostAction = (id) => async (dispatch) => {
  const res = await likePostAPI(id);
  dispatch({
    type: LIKE_POST,
    payload: res.data.post,
  });
};

export const deletePostAction = (id) => async (dispatch) => {
  const res = await deletePostAPI(id);
  dispatch({
    type: DELETE_POST,
    payload: id,
  });
};

export const setEditPostIdAction = (id) => async (dispatch) => {
  dispatch({
    type: EDIT_POST_ID,
    payload: id,
  });
};
export const resetIdACtion = () => async (dispatch) => {
  dispatch({
    type: RESET_ID,
  });
};

export const unexpectedErrorAction = (mes) => async (dispatch) => {
  dispatch({
    type: mes,
    payload: { value: true, message: mes },
  });
};

export const errorResetAction = () => async (dispatch) => {
  dispatch({
    type: ERROR_RESET,
    payload: { value: false, message: "All is good" },
  });
};

export const signUpAction = (user) => async (dispatch) => {
  const res = await signUpAPI(user);
  dispatch({
    type: SIGNUP,
    payload: { user: res.data.data.user, token: res.data.data.token },
  });
  return res;
};

export const signInAction = (user) => async (dispatch) => {
  const res = await signInAPI(user);
  dispatch({
    type: SIGNIN,
    payload: { user: res.data.data.user, token: res.data.data.token },
  });
  return res;
};

export const googleAuthAction = (profile, token) => async (dispatch) => {
  googleSigninAPI(token);
  dispatch({
    type: GOOGLE_AUTH,
    payload: { profile, token },
  });
};

export const logOutAction = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
