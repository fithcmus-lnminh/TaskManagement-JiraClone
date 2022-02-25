import { USER_LOGIN } from "../../utils/settingSystem";
import {
  GET_ALL_USER,
  GET_USER_BY_PROJECT,
  LOGGED_USER,
  SEARCH_USER,
} from "../consts/taskManagement";

let userLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin,
  userSearch: [],
  allUsers: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_USER:
      state.userLogin = action.userLogin;
      return { ...state };
    case SEARCH_USER:
      state.userSearch = action.userSearch;
      return { ...state };
    case GET_ALL_USER:
      state.allUsers = action.allUsers;
      return { ...state };
    case GET_USER_BY_PROJECT:
      state.allUsers = action.userArr;
      return { ...state };
    default:
      return state;
  }
};
