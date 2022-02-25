import { takeLatest, call, put, select } from "redux-saga/effects";
import { taskService } from "../../services/taskService";
import { openNotification } from "../../utils/notification";
import { CREATE_TASK_SAGA, HIDE_DRAWER } from "../consts/taskManagement";

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
