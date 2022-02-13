import { takeLatest, call, put } from "redux-saga/effects";
import { taskService } from "../../services/taskService";
import { CREATE_PROJECT_SAGA } from "../consts/taskManagement";

//Manage saga action
function* createProject(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      taskService.createProjectWithAuthorization(action.newProject)
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export function* monitorCreateProject() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}
