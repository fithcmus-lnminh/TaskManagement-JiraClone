import {
  EDIT_PROJECT,
  GET_ALL_PRIORITY,
  GET_ALL_PROJECT,
  GET_ALL_TASKTYPE,
  GET_PROJECT_DETAIL,
  GET_PROJECT_LIST,
} from "../consts/taskManagement";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "Default",
    description: "<h1>Default</h1>",
    categoryId: "1",
  },
  projectDetail: {},
  allProject: [],
  allTaskType: [],
  allPriority: [],
};

const getProjectInitialState = {
  projectList: [],
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      state.projectEdit = action.projectEditModel;
      return { ...state };
    case GET_PROJECT_DETAIL:
      state.projectDetail = action.projectDetail;
      return { ...state };
    case GET_ALL_PROJECT:
      state.allProject = action.allProjectArr;
      return { ...state };
    case GET_ALL_TASKTYPE:
      state.allTaskType = action.allTaskTypeArr;
      return { ...state };
    case GET_ALL_PRIORITY:
      state.allPriority = action.allPriorityArr;
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
