import { all } from "redux-saga/effects";
import {
  monitorCreateProject,
  monitorDeleteProject,
  monitorEditProject,
  monitorGetListProject,
  monitorSearchUser,
  monitorGetProjectDetail,
} from "./ProjectSaga";
import { monitorCategory } from "./ProjectCategorySaga";
import {
  monitorAddUserToProject,
  monitorLogin,
  monitorRemoveUserFromProject,
} from "./taskManagement/UserSaga";

export function* rootSaga() {
  yield all([
    monitorLogin(),
    monitorCategory(),
    monitorCreateProject(),
    monitorGetListProject(),
    monitorEditProject(),
    monitorDeleteProject(),
    monitorSearchUser(),
    monitorAddUserToProject(),
    monitorRemoveUserFromProject(),
    monitorGetProjectDetail(),
  ]);
}
