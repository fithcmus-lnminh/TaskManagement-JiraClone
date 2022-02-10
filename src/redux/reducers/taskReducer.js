const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "first":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
