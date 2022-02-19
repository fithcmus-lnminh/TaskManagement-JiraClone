import { USER_LOGIN } from "../../utils/settingSystem";
import { LOGGED_USER, SEARCH_USER } from "../consts/taskManagement";

let userLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin,
  userSearch: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_USER:
      state.userLogin = action.userLogin;
      return { ...state };
    case SEARCH_USER:
      state.userSearch = action.userSearch;
      return { ...state };
    default:
      return state;
  }
};
