import { submitPost } from "../../APIs/APIs";

export const addPost = (post) => async (dispatch) => {
  await submitPost(post);
  dispatch({
    type: "ADD_POST",
    payload: "ADD_POST",
  });
};
