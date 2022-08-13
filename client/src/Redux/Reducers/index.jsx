import { combineReducers } from "redux";
import postReducer from "./post";

const reducers = combineReducers({
  posts: postReducer,
});

export default reducers;
