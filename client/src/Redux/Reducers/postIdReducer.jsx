const postIdReducer = (state = "", action) => {
  switch (action.type) {
    case "EDIT_POST":
      return action.payload;

    case "RESET_ID":
      return "";

    default:
      return state;
  }
};

export default postIdReducer;