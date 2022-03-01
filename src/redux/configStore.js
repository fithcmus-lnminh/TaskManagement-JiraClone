import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { navigateReducer } from "./reducers/navigateReducer";
import { userReducer } from "./reducers/userReducer";
import { ProjectCategoryReducer } from "./reducers/projectCategoryReducer";
import { getProjectReducer, ProjectReducer } from "./reducers/ProjectReducer";
import { drawerReducer } from "./reducers/drawerReducer";
import { taskReducer } from "./reducers/taskReducer";
import { authReducer } from "./reducers/authReducer";
import { modalReducer } from "./reducers/modalReducer";

const middlewareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  //Reducers
  navigateReducer,
  userReducer,
  ProjectCategoryReducer,
  getProjectReducer,
  ProjectReducer,
  drawerReducer,
  taskReducer,
  authReducer,
  modalReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
middlewareSaga.run(rootSaga);

export default store;
