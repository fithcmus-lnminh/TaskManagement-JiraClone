import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { navigateReducer } from "./reducers/navigateReducer";
import { userReducer } from "./reducers/userReducer";
import { ProjectCategoryReducer } from "./reducers/projectCategoryReducer";
import { projectReducer } from "./reducers/ProjectReducer";

const middlewareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  //Reducers
  navigateReducer,
  userReducer,
  ProjectCategoryReducer,
  projectReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
middlewareSaga.run(rootSaga);

export default store;
