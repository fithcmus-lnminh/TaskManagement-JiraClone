const initialState = {
  navigate: {},
};

export const navigateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NAVIGATE":
      state.navigate = action.navigate;
      return { ...state };

    default:
      return state;
  }
};
