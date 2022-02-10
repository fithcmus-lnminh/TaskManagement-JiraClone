import { all } from "redux-saga/effects";
import { monitorLogin } from "./taskManagement/UserSaga";

export function* rootSaga() {
  yield all([monitorLogin()]);
}
