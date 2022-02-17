import Axios from "axios";
import { DOMAIN, TOKEN } from "../utils/settingSystem";

export class baseService {
  //put json to backend
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      //if service is not use JWT, it'll skip it
    });
  };

  //post json to backend
  post = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      //if service is not use JWT, it'll skip it
    });
  };

  //get data from backend
  get = (url) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      //if service is not use JWT, it'll skip it
    });
  };

  delete = (url) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      //if service is not use JWT, it'll skip it
    });
  };
}
