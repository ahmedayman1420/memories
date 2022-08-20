import { SET_POST_DETAILS } from "../Actions/actionStrings";

const postDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POST_DETAILS:
      return action.payload;

    default:
      return state;
  }
};

export default postDetailsReducer;
