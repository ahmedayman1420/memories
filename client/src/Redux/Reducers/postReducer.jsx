const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      return [...state, action.payload];

    case "EDIT_POST":
      return state.map((obj) => {
        if (action.payload._id === obj._id) return action.payload;
        else return obj;
      });

    case "DELETE_POST":
      return state.filter((item) => {
        return item._id !==
         action.payload;
      });

    case "GET_POSTS":
      return action.payload;

    default:
      return state;
  }
};

export default postReducer;
