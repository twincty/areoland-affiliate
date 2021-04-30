export const TOGGLE_SIDE_BAR = "APP_TOGGLE_SIDE_BAR";
export const SELECT_DRAWER_MENU = "APP_SELECT_DRAWER_MENU";
export const GET_DATA = "DASHBOARD_GET_DATA";
export const LOAD_DATA = "DASHBORD_LOAD_DATA";
export const SIGNIN = "USER_SIGNIN";

const initialState = {
  drawer: {
    sidebar: false,
  },
  user: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, user: action.userData };

    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          sidebar: action.value,
        },
      };

    default:
      return { ...state };
  }
};

export default AppReducer;
