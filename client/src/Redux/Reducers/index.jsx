import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import postIdReducer from "./postIdReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  posts: postReducer,
  error: errorReducer,
  postId: postIdReducer,
});

export default reducers;
