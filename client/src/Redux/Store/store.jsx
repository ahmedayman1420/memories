import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../Reducers";

const initialState = { posts: [] };

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
