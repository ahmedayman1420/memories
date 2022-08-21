import {
  ERROR_ADD_POST,
  ERROR_EDIT_POST,
  ERROR_RESET,
  ERROR_SEARCH_POST,
  ERROR_SEND_COMMENT,
  ERROR_SIGNIN,
  ERROR_SIGNUP,
} from "../Actions/actionStrings";

const errorReducer = (state = { value: false, message: "" }, action) => {
  switch (action.type) {
    case ERROR_ADD_POST:
      return { ...action.payload, type: "post" };

    case ERROR_EDIT_POST:
      return { ...action.payload, type: "post" };

    case ERROR_SIGNUP:
      return { ...action.payload, type: "auth" };

    case ERROR_SIGNIN:
      return { ...action.payload, type: "auth" };

    case ERROR_SEARCH_POST:
      return { ...action.payload, type: "search" };

    case ERROR_SEND_COMMENT:
      return { ...action.payload, type: "comment" };

    case ERROR_RESET:
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
