import { takeLatest, call, put, select } from "redux-saga/effects";
import { projectService } from "../../services/projectService";
import { taskService } from "../../services/taskService";
import {
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT_SAGA,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_LIST,
} from "../consts/taskManagement";
import { openNotification } from "../../utils/notification";

//Manage saga action
function* createProject(action) {
  //Call API
  try {
    const { status } = yield call(() =>
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
        type: GET_PROJECT_LIST,
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

function* editProject(action) {
  try {
    const { status } = yield call(() =>
      taskService.editProject(action.editProject)
    );

    const navigate = yield select((state) => state.navigateReducer.navigate);

    if (status === 200) {
      navigate("/project-management");
    }
  } catch (err) {
    console.log(err);
  }
}

export function* monitorEditProject() {
  yield takeLatest(EDIT_PROJECT_SAGA, editProject);
}

function* deleteProject(action) {
  try {
    const { status } = yield call(() =>
      projectService.deleteProject(action.id)
    );

    if (status === 200) {
      openNotification("success", "Delete Project Successfully!");
    }
    yield put({ type: GET_LIST_PROJECT_SAGA });
  } catch (err) {
    openNotification("error", "Delete Project Failed!", err);
    console.log(err);
  }
}

export function* monitorDeleteProject() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject);
}
