import { takeLatest, call, put, select } from "redux-saga/effects";
import { taskService } from "../../services/taskService";
import {
  CREATE_PROJECT_SAGA,
  GET_LIST_PROJECT_SAGA,
} from "../consts/taskManagement";

//Manage saga action
function* createProject(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      taskService.createProjectWithAuthorization(action.newProject)
    );

    const navigate = yield select((state) => state.navigateReducer.navigate);

    if (status === 200) {
      navigate("/project-management");
    }
  } catch (err) {
    console.log(err);
  }
}

export function* monitorCreateProject() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}

function* getListProject(action) {
  try {
    const { data, status } = yield call(() => taskService.getListProject());
    console.log(data);

    if (status === 200) {
      yield put({
        type: "GET_PROJECT_LIST",
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* monitorGetListProject() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProject);
}