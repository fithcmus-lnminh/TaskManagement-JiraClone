import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { navigateReducer } from "./reducers/navigateReducer";

const middlewareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  //Reducers
  navigateReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
middlewareSaga.run(rootSaga);

export default store;
