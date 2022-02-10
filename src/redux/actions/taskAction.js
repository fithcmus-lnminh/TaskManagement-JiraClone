import { USER_LOGIN_API } from "../../redux/consts/taskManagement";

export const loginAction = (email, password) => {
  return {
    type: USER_LOGIN_API,
    userInfo: {
      email: email,
      password: password,
    },
  };
};
