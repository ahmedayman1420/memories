import { useNavigate } from "react-router-dom";

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

export const addPostAction = (post, googleAuth) => async (dispatch) => {
  const res = await addPostAPI(post, googleAuth);
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

export const editPostACtion = (post, googleAuth) => async (dispatch) => {
  const res = await editPostAPI(post, googleAuth);
  dispatch({
    type: EDIT_POST,
    payload: res.data.post,
  });
};

export const likePostAction = (post, googleAuth) => async (dispatch) => {
  const res = await likePostAPI(post, googleAuth);
  console.log(res);
  dispatch({
    type: LIKE_POST,
    payload: res.data.post,
  });
};

export const deletePostAction = (post, googleAuth) => async (dispatch) => {
  const res = await deletePostAPI(post, googleAuth);
  dispatch({
    type: DELETE_POST,
    payload: post._id,
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
  if (res?.data?.message !== "Sign up Successfully") return res;
  dispatch({
    type: SIGNUP,
    payload: { user: res.data.data.user, token: res.data.data.token },
  });
  return res;
};

export const signInAction = (user) => async (dispatch) => {
  const res = await signInAPI(user);
  if (res?.data?.message !== "Sign in Successfully") return res;
  dispatch({
    type: SIGNIN,
    payload: { user: res.data.data.user, token: res.data.data.token },
  });
  return res;
};

export const googleAuthAction = (profile, token) => async (dispatch) => {
  const res = await googleSigninAPI(token);
  if (
    res?.data?.message !== "Sign up Successfully with Google" &&
    res?.data?.message !== "Sign in Successfully with Google"
  )
    return res;
  dispatch({
    type: GOOGLE_AUTH,
    payload: { profile, token, user: res.data.data.user },
  });
};

export const logOutAction = () => async (dispatch) => {
  await dispatch({
    type: LOGOUT,
  });
};
