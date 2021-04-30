import store from "../store";

import { TOGGLE_SIDE_BAR, SIGNIN } from "../reducers/app_reducer";

const toggleSideBar = (value) => {
  store.dispatch({ type: TOGGLE_SIDE_BAR, value: value });
};

const signin = (userData) => {
  store.dispatch({ type: SIGNIN, userData: userData });
};

const AppActions = {
  toggleSideBar,
  signin,
};

export default AppActions;
