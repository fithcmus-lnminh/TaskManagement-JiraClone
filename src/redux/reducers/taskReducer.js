import { GET_TASK_DETAIL } from "../consts/taskManagement";
import {
  CHANGE_ASSIGNESS,
  CHANGE_MODAL,
  CHANGE_TASK_MODAL,
  REMOVE_ASSIGNEE,
} from "../consts/taskManagement/task";

const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [],
    lstComment: [],
    taskId: 2938,
    taskName: "Test create number",
    alias: "test-create-number",
    description: "",
    statusId: "1",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    typeId: 1,
    priorityId: 1,
    projectId: 3435,
  },
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL:
      state.taskDetailModal = action.taskDetailModal;
      return { ...state };
    case CHANGE_MODAL:
      return {
        ...state,
        taskDetailModal: {
          ...state.taskDetailModal,
          [action.name]: action.value,
        },
      };
    case CHANGE_ASSIGNESS:
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.user,
      ];
      return { ...state };
    case REMOVE_ASSIGNEE:
      console.log(action);
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness.filter(
          (a) => a.id !== action.userId
        ),
      ];
      return { ...state };
    default:
      return state;
  }
};
