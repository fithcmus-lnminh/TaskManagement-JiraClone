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
  GET_LIST_PROJECT_SAGA,
  USER_LOGIN_API,
} from "../../consts/taskManagement/index";
import { taskService } from "../../../services/taskService";
import { TOKEN, USER_LOGIN } from "../../../utils/settingSystem";
import { LOGGED_USER } from "../../consts/taskManagement/index";
import { userService } from "../../../services/userService";
import { openNotification } from "../../../utils/notification";

//Manage saga action
function* loginSaga(action) {
  //Call API
  try {
    const { data, status } = yield call(() =>
      taskService.login(action.userInfo)
    );

    //Save on local storage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: LOGGED_USER,
      userLogin: data.content,
    });

    console.log(data);
    //~useSelector
    const navigate = yield select((state) => state.navigateReducer.navigate);
    navigate("/");
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* monitorLogin() {
  yield takeLatest(USER_LOGIN_API, loginSaga);
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
    if (err.status === 400)
      openNotification("error", "You do not have permission to this project!");
    else openNotification("warning", "You have already added this user!");
    console.log(err);
  }
}

export function* monitorAddUserToProject() {
  yield takeLatest(ADD_USER_TO_PROJECT_SAGA, addUserToProject);
}
