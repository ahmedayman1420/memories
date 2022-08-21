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
  searchPostAPI,
  getPostAPI,
  addCommentAPI,
} from "../../APIs/APIs";
import {
  ADD_POST,
  DECREASE_POST_COUNT,
  DELETE_POST,
  EDIT_POST,
  EDIT_POST_ID,
  ERROR_RESET,
  GET_POSTS,
  GOOGLE_AUTH,
  INCREASE_POST_COUNT,
  LIKE_POST,
  LOGOUT,
  RESET_ID,
  SEARCH_POST,
  SET_POST_COUNT,
  SET_POST_DETAILS,
  SIGNIN,
  SIGNUP,
  UPDATE_GOOGLE_AUTH,
} from "./actionStrings";

export const addPostAction = (post, googleAuth) => async (dispatch) => {
  const res = await addPostAPI(post, googleAuth);
  dispatch({
    type: ADD_POST,
    payload: res.data.post,
  });
  dispatch({
    type: INCREASE_POST_COUNT,
  });
};

export const getPostsAction =
  (page = 1) =>
  async (dispatch) => {
    const res = await getAllPostsAPI(page);
    dispatch({
      type: GET_POSTS,
      payload: res.data.posts,
    });
    dispatch({
      type: SET_POST_COUNT,
      payload: res.data.totalCount,
    });
  };

export const getPostAction = (id, googleAuth) => async (dispatch) => {
  const res = await getPostAPI(id, googleAuth);
  dispatch({
    type: SET_POST_DETAILS,
    payload: res.data.post,
  });
};

export const addCommentAction = (comment, id, googleAuth) => async (dispatch) => {
  const res = await addCommentAPI(comment, id, googleAuth);
  dispatch({
    type: SET_POST_DETAILS,
    payload: res.data.post,
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
  dispatch({
    type: DECREASE_POST_COUNT,
  });
};

export const setEditPostIdAction = (id) => async (dispatch) => {
  dispatch({
    type: EDIT_POST_ID,
    payload: id,
  });
};

export const serachPostAction =
  (titles, tags, googleAuth, page = 1) =>
  async (dispatch) => {
    const res = await searchPostAPI(titles, tags, googleAuth, page);
    dispatch({
      type: SEARCH_POST,
      payload: res.data.posts, // Will be changed
    });
    dispatch({
      type: SET_POST_COUNT,
      payload: res.data.totalCount,
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
  await dispatch({
    type: SIGNUP,
    payload: { user: res.data.data.user, token: res.data.data.token },
  });
  return res;
};

export const signInAction = (user) => async (dispatch) => {
  const res = await signInAPI(user);
  if (res?.data?.message !== "Sign in Successfully") return res;
  await dispatch({
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
  await dispatch({
    type: GOOGLE_AUTH,
    payload: { profile, token, user: res.data.data.user },
  });
};

export const updateGoogleAuthAction = (googleAuth) => async (dispatch) => {
  await dispatch({
    type: UPDATE_GOOGLE_AUTH,
    payload: googleAuth,
  });
};

export const logOutAction = () => async (dispatch) => {
  await dispatch({
    type: LOGOUT,
  });
};
