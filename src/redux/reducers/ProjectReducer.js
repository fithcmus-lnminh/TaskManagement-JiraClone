const initialState = {
  projectEdit: {
    id: 0,
    projectName: "faaa",
    description: "<h1>fafa</h1>",
    categoryId: "3",
  },
};

const getProjectInitialState = {
  projectList: [],
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return { ...state };

    default:
      return state;
  }
};

export const getProjectReducer = (state = getProjectInitialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_LIST":
      state.projectList = action.projectList.reverse();
      return { ...state };

    default:
      return state;
  }
};
