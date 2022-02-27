import { GET_TASK_DETAIL } from "../consts/taskManagement";
import { CHANGE_MODAL, CHANGE_TASK_MODAL } from "../consts/taskManagement/task";

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
    default:
      return state;
  }
};
