import { createStore, combineReducers } from "redux";
import AppReducer from "./reducers/app_reducer";

const reducers = combineReducers({
  app: AppReducer,
});

const store = createStore(reducers);

export default store;
