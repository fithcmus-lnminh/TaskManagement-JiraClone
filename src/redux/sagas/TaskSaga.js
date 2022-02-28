import { takeLatest, call, put, select } from "redux-saga/effects";
import { taskService } from "../../services/taskService";
import { openNotification } from "../../utils/notification";
import {
  CREATE_TASK_SAGA,
  GET_PROJECT_DETAIL_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API,
  HIDE_DRAWER,
  UPDATE_TASK_SAGA,
} from "../consts/taskManagement";
import {
  CHANGE_ASSIGNESS,
  CHANGE_MODAL,
  REMOVE_ASSIGNEE,
} from "../consts/taskManagement/task";

function* createTask(action) {
  const navigate = yield select((state) => state.navigateReducer.navigate);
  try {
    const { status } = yield call(() => taskService.createTask(action.task));
    if (status === 200) {
      yield put({ type: HIDE_DRAWER });
      navigate(`/project-detail/${action.task.projectId.toString()}`);
      openNotification("success", "Create Task Successfully");
    }
  } catch (err) {
    openNotification(
      "error",
      "You do not have any permission to this project!"
    );
    console.log(err.response.data);
  }
}

export function* monitorCreateTask() {
  yield takeLatest(CREATE_TASK_SAGA, createTask);
}

function* getTaskDetail(action) {
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(action.taskId)
    );
    if (status === 200) {
      yield put({ type: GET_TASK_DETAIL, taskDetailModal: data.content });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* monitorGetTaskDetail() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}

function* handleChangePostApi(action) {
  //Khi change các giá trị ko thay đổi liền mà redux phải tồn thời gian xử lí
  //nên không thể dispatch 2 lần liên tiếp (change dữ liệu và lấy dữ liệu đó cập nhật)
  switch (action.actionType) {
    case CHANGE_MODAL:
      yield put({
        type: CHANGE_MODAL,
        name: action.name,
        value: action.value,
      });
      break;
    case CHANGE_ASSIGNESS:
      yield put({ type: CHANGE_ASSIGNESS, user: action.user });
      break;
    case REMOVE_ASSIGNEE:
      yield put({ type: REMOVE_ASSIGNEE, userId: action.userId });
      break;
  }

  let { taskDetailModal } = yield select((state) => state.taskReducer);

  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdate = { ...taskDetailModal, listUserAsign };

  try {
    const { status } = yield call(() => taskService.updateTask(taskUpdate));

    if (status === 200) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdate.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdate.taskId,
      });
    }
  } catch (err) {
    openNotification(
      "error",
      "Permission denied!",
      "All changes will not be saved"
    );
    console.log(err);
  }
}
export function* monitorHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API, handleChangePostApi);
}
