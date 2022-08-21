import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../Reducers";

const initialState = {
  posts: [],
  error: { value: false, message: "" },
  postId: "",
  postCount: 0,
  postDetails: {},
};

export const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
