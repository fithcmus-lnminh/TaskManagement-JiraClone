import { takeLatest, call, put, select } from "redux-saga/effects";
import { commentService } from "../../services/commentService";
import {
  GET_ALL_COMMENT_SAGA,
  GET_TASK_DETAIL_SAGA,
  INSERT_COMMENT_SAGA,
  GET_ALL_COMMENT,
} from "../consts/taskManagement";
import { CHANGE_COMMENT } from "../consts/taskManagement/task";

function* getAllComment(action) {
  try {
    const { data, status } = yield call(() => {
      commentService.getAllComment(action.taskId);
    });

    if (status === 200) {
      yield put({ type: CHANGE_COMMENT, comments: data.content });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* monitorGetAllComment() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllComment);
}

function* insertComment(action) {
  try {
    const { status } = yield call(() =>
      commentService.insertComment(action.cmtModel)
    );
  } catch (err) {
    console.log(err);
  }
}

export function* monitorInsertComment() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertComment);
}
