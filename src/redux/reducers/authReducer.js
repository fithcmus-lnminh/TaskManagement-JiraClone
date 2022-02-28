import { TOKEN } from "../../utils/settingSystem";
import { LOGGED_IN, LOGGED_OUT } from "../consts/taskManagement";

const initialState = {
  isLoggedIn: localStorage.getItem(TOKEN) ? true : false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      state.isLoggedIn = true;
      return { ...state };
    case LOGGED_OUT:
      state.isLoggedIn = false;
      return { ...state };
    default:
      return state;
  }
};
