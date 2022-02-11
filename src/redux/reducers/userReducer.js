import { USER_LOGIN } from "../../utils/settingSystem";
import { LOGGED_USER } from "../consts/taskManagement";

let userLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_USER:
      state.userLogin = action.userLogin;
      return { ...state };
    default:
      return state;
  }
};
