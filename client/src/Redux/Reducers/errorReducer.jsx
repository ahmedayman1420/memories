const errorReducer = (state = { value: false, message: "" }, action) => {
  switch (action.type) {
    case "ERROR_ADD_POST":
      return action.payload;

    case "ERROR_RESET":
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
