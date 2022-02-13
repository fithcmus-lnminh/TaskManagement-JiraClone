import { all } from "redux-saga/effects";
import { monitorCreateProject, monitorGetListProject } from "./ProjectSaga";
import { monitorCategory } from "./ProjectCategorySaga";
import { monitorLogin } from "./taskManagement/UserSaga";

export function* rootSaga() {
  yield all([
    monitorLogin(),
    monitorCategory(),
    monitorCreateProject(),
    monitorGetListProject(),
  ]);
}
