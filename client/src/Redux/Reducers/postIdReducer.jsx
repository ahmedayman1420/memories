import { EDIT_POST_ID, RESET_ID } from "../Actions/actionStrings";

const postIdReducer = (state = "", action) => {
  switch (action.type) {
    case EDIT_POST_ID:
      return action.payload;

    case RESET_ID:
      return "";

    default:
      return state;
  }
};

export default postIdReducer;
