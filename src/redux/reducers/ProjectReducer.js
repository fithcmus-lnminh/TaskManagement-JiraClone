const initialState = {
  projectList: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_LIST":
      state.projectList = action.projectList.reverse();
      return { ...state };

    default:
      return state;
  }
};
