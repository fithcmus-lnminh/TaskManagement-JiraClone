import {
  call,
  delay,
  takeEvery,
  takeLatest,
  put,
  select,
} from "redux-saga/effects";
import { USER_LOGIN_API } from "../../consts/taskManagement/index";
import { taskService } from "../../../services/taskService";
import { TOKEN, USER_LOGIN } from "../../../utils/settingSystem";
import { LOGGED_USER } from "../../consts/taskManagement/index";

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
