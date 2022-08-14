import {ERROR_ADD_POST, ERROR_EDIT_POST, ERROR_RESET} from "../Actions/actionStrings";

const errorReducer = (state = { value: false, message: "" }, action) => {
  switch (action.type) {
    case ERROR_ADD_POST:
      return action.payload;
      
    case ERROR_EDIT_POST:
      return action.payload;

    case ERROR_RESET:
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
