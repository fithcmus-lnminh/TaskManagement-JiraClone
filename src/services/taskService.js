import Axios from "axios";
import { DOMAIN, TOKEN } from "../utils/settingSystem";

export const taskService = {
  login: (userInfo) => {
    return Axios({
      url: `${DOMAIN}/users/signin`,
      method: "POST",
      data: userInfo,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN}/ProjectCategory`,
      method: "GET",
    });
  },
  createProject: (model) => {
    return Axios({
      url: `${DOMAIN}/Project/createProject`,
      method: "POST",
      data: model,
    });
  },
  createProjectWithAuthorization: (model) => {
    return Axios({
      url: `${DOMAIN}/Project/createProjectAuthorize`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
    });
  },
  getListProject: () => {
    return Axios({
      url: `${DOMAIN}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //must login
    });
  },
};
