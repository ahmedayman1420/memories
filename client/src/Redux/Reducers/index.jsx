import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import googleAuthReducer from "./googleAuthReducer";
import postCountReducer from "./postCountReducer";
import postDetailsReducer from "./postDetailsReducer";
import postIdReducer from "./postIdReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  posts: postReducer,
  error: errorReducer,
  postId: postIdReducer,
  googleAuth: googleAuthReducer,
  postCount: postCountReducer,
  postDetails: postDetailsReducer,
});

export default reducers;
