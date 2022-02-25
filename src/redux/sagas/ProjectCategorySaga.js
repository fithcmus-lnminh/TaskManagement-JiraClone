import { takeLatest, call, put } from "redux-saga/effects";
import { appService } from "../../services/appService";
import {
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_SAGA,
} from "../consts/taskManagement";

//Manage saga action
function* ProjectCategorySaga(action) {
  //Call API
  const { data, status } = yield call(() => appService.getAllProjectCategory());

  yield put({
    type: GET_ALL_CATEGORY,
    categoryArr: data.content,
  });
}

export function* monitorCategory() {
  yield takeLatest(GET_ALL_CATEGORY_SAGA, ProjectCategorySaga);
}
