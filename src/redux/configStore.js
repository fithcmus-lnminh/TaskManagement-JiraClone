import { createStore, combineReducers, applyMiddleware } from "redux";
import taskReducer from "./reducers/taskReducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

const middlewareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  //Reducers
  taskReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
middlewareSaga.run(rootSaga);

export default store;
