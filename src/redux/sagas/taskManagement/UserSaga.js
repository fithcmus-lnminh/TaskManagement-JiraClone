import {
  call,
  delay,
  takeEvery,
  takeLatest,
  put,
  select,
} from "redux-saga/effects";
import {
  ADD_USER_TO_PROJECT_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_LIST_PROJECT_SAGA,
  GET_USER_BY_PROJECT,
  GET_USER_BY_PROJECT_SAGA,
  LOGGED_IN,
  REMOVE_USER_FROM_PROJECT,
  USER_LOGIN_API,
  USER_REGISTER_SAGA,
} from "../../consts/taskManagement/index";
import { appService } from "../../../services/appService";
import { TOKEN, USER_LOGIN } from "../../../utils/settingSystem";
import { LOGGED_USER } from "../../consts/taskManagement/index";
import { userService } from "../../../services/userService";
import { openNotification } from "../../../utils/notification";

//Manage saga action
function* loginSaga(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      appService.login(action.userInfo)
    );

    //Save on local storage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: LOGGED_USER,
      userLogin: data.content,
    });

    yield put({
      type: LOGGED_IN,
    });

    const navigate = yield select((state) => state.navigateReducer.navigate);
    navigate("/");
  } catch (err) {
    openNotification("error", "Invalid Email or Password");
    console.log(err.response.data);
  }
}

export function* monitorLogin() {
  yield takeLatest(USER_LOGIN_API, loginSaga);
}

function* register(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      appService.register(action.userInfo)
    );

    const navigate = yield select((state) => state.navigateReducer.navigate);

    if (status === 200) {
      navigate("/login");
      openNotification("success", "Register successfully!");
    }
  } catch (err) {
    openNotification("error", "User already exists!");
    console.log(err.response.data);
  }
}

export function* monitorRegister() {
  yield takeLatest(USER_REGISTER_SAGA, register);
}

function* addUserToProject(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      userService.assignUserToProject(action.userProject)
    );

    if (status === 200) {
      yield put({ type: GET_LIST_PROJECT_SAGA });
      openNotification("success", "Add Member To Project Successfully!");
    }
  } catch (err) {
    if (err.status === 500)
      openNotification("warning", "You have already added this user!");
    else {
      openNotification("error", "You do not have permission to this project!");
    }
    console.log(err);
  }
}

export function* monitorAddUserToProject() {
  yield takeLatest(ADD_USER_TO_PROJECT_SAGA, addUserToProject);
}

function* removeUserFromProject(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      userService.removeUserFromProject(action.userProject)
    );

    if (status === 200) {
      yield put({ type: GET_LIST_PROJECT_SAGA });
      openNotification("success", "Remove Member Successfully!");
    }
  } catch (err) {
    openNotification("error", "You do not have permission to this project!");
    console.log(err);
  }
}

export function* monitorRemoveUserFromProject() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT, removeUserFromProject);
}

function* getAllUser(action) {
  //Call API
  try {
    const { data, status } = yield call(() => userService.getAllUser());

    if (status === 200) {
      yield put({ type: GET_ALL_USER, allUsers: data.content });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* monitorGetAllUser() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUser);
}

function* getUserByProjectId(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(action.projectId)
    );

    if (status === 200) {
      yield put({ type: GET_USER_BY_PROJECT, userArr: data.content });
    }
  } catch (err) {
    console.log(err.response?.data);
    if (err.response?.data.statusCode === 404) {
      yield put({ type: GET_USER_BY_PROJECT, userArr: [] });
    }
  }
}

export function* monitorGetUserByProjectId() {
  yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProjectId);
}
