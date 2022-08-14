const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      return [...state, action.payload];

    case "GET_POSTS":
      return action.payload;

    default:
      return state;
  }
};

export default postReducer;
