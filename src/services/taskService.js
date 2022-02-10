import Axios from "axios";
import { DOMAIN } from "../utils/settingSystem";

export const taskService = {
  login: (userInfo) => {
    return Axios({
      url: `${DOMAIN}/users/signin`,
      method: "POST",
      data: userInfo,
    });
  },
};
