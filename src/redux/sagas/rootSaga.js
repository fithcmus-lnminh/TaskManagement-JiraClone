import { all } from "redux-saga/effects";
import { monitorCategory } from "./ProjectCategorySaga";
import { monitorLogin } from "./taskManagement/UserSaga";

export function* rootSaga() {
  yield all([monitorLogin(), monitorCategory()]);
}
