import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import googleAuthReducer from "./googleAuthReducer";
import postCountReducer from "./postCountReducer";
import postIdReducer from "./postIdReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  posts: postReducer,
  error: errorReducer,
  postId: postIdReducer,
  googleAuth: googleAuthReducer,
  postCount: postCountReducer,
});

export default reducers;
