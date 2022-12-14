import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POSTS,
  LIKE_POST,
  SEARCH_POST,
} from "../Actions/actionStrings";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return [action.payload, state[0]];

    case EDIT_POST:
      return state.map((obj) => {
        if (action.payload._id === obj._id) return action.payload;
        else return obj;
      });

    case LIKE_POST:
      return state.map((obj) => {
        if (action.payload._id === obj._id) return action.payload;
        else return obj;
      });

    case DELETE_POST:
      return state.filter((item) => {
        return item._id !== action.payload;
      });

    case GET_POSTS:
      return action.payload;

    case SEARCH_POST:
      return action.payload;

    default:
      return state;
  }
};

export default postReducer;
