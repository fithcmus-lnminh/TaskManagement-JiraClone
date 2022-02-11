import { call, delay, takeEvery, takeLatest, put } from "redux-saga/effects";
import { USER_LOGIN_API } from "../../consts/taskManagement/index";
import { taskService } from "../../../services/taskService";
import { TOKEN, USER_LOGIN } from "../../../utils/settingSystem";

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

    console.log(data);
    console.log(history);
    history.push("/");
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* monitorLogin() {
  yield takeLatest(USER_LOGIN_API, loginSaga);
}
