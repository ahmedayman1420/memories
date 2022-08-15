import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import googleAuthReducer from "./googleAuthReducer";
import postIdReducer from "./postIdReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  posts: postReducer,
  error: errorReducer,
  postId: postIdReducer,
  googleAuth: googleAuthReducer,
});

export default reducers;
