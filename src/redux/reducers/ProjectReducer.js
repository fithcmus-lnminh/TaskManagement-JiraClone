import { EDIT_PROJECT, GET_PROJECT_LIST } from "../consts/taskManagement";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "Default",
    description: "<h1>Default</h1>",
    categoryId: "1",
  },
};

const getProjectInitialState = {
  projectList: [],
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      state.projectEdit = action.projectEditModel;
      return { ...state };

    default:
      return state;
  }
};

export const getProjectReducer = (state = getProjectInitialState, action) => {
  switch (action.type) {
    case GET_PROJECT_LIST:
      state.projectList = action.projectList.reverse();
      return { ...state };

    default:
      return state;
  }
};
