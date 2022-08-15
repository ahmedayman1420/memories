import {
  ERROR_ADD_POST,
  ERROR_EDIT_POST,
  ERROR_RESET,
  ERROR_SIGNIN,
} from "../Actions/actionStrings";

const errorReducer = (state = { value: false, message: "" }, action) => {
  switch (action.type) {
    case ERROR_ADD_POST:
      return action.payload;

    case ERROR_EDIT_POST:
      return action.payload;

    case ERROR_SIGNIN:
      return action.payload;

    case ERROR_RESET:
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
