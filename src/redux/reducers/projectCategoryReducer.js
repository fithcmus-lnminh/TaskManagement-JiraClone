const initialState = {
  categoryArr: [],
};

export const ProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORY":
      state.categoryArr = action.categoryArr;
      return { ...state };

    default:
      return state;
  }
};
