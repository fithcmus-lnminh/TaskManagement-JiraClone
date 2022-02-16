import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { navigateReducer } from "./reducers/navigateReducer";
import { userReducer } from "./reducers/userReducer";
import { ProjectCategoryReducer } from "./reducers/projectCategoryReducer";
import { getProjectReducer, ProjectReducer } from "./reducers/ProjectReducer";
import { drawerReducer } from "./reducers/drawerReducer";

const middlewareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  //Reducers
  navigateReducer,
  userReducer,
  ProjectCategoryReducer,
  getProjectReducer,
  ProjectReducer,
  drawerReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
middlewareSaga.run(rootSaga);

export default store;
