import { GOOGLE_AUTH, LOGOUT } from "../Actions/actionStrings";

const googleAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_AUTH:
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
