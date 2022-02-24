import { all } from "redux-saga/effects";
import {
  monitorCreateProject,
  monitorDeleteProject,
  monitorEditProject,
  monitorGetListProject,
  monitorSearchUser,
  monitorGetProjectDetail,
  monitorGetAllProject,
  monitorGetAllTaskType,
  monitorGetAllPriority,
  monitorGetAllStatus,
} from "./ProjectSaga";
import { monitorCategory } from "./ProjectCategorySaga";
import {
  monitorAddUserToProject,
  monitorGetAllUser,
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
    monitorGetAllProject(),
    monitorGetAllTaskType(),
    monitorGetAllPriority(),
    monitorGetAllUser(),
    monitorGetAllStatus(),
  ]);
}
