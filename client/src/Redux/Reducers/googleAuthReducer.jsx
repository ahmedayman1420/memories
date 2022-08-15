import { GOOGLE_AUTH, LOGOUT, SIGNIN, SIGNUP } from "../Actions/actionStrings";

const googleAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_AUTH:
      localStorage.setItem("memoryProfile", JSON.stringify(action.payload));
      return action.payload;

    case SIGNUP:
      localStorage.setItem("memoryProfile", JSON.stringify(action.payload));
      return action.payload;

    case SIGNIN:
      localStorage.setItem("memoryProfile", JSON.stringify(action.payload));
      return action.payload;

    case LOGOUT:
      localStorage.clear();
      return {};

    default:
      return state;
  }
};

export default googleAuthReducer;
