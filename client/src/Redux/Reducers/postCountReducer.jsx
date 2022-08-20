import {
  DECREASE_POST_COUNT,
  INCREASE_POST_COUNT,
  SET_POST_COUNT,
} from "../Actions/actionStrings";

const postCountReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_POST_COUNT:
      return action.payload;

    case INCREASE_POST_COUNT:
      return state + 1;

    case DECREASE_POST_COUNT:
      return state - 1;

    default:
      return state;
  }
};

export default postCountReducer;
