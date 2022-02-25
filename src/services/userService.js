import { baseService } from "./baseService";

class UserService extends baseService {
  constructor() {
    super();
  }

  getUserByKeyword = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`);
  };

  assignUserToProject = (userProject) => {
    return this.post("Project/assignUserProject", userProject);
  };

  removeUserFromProject = (userProject) => {
    return this.post("Project/removeUserFromProject", userProject);
  };

  getAllUser = () => {
    return this.get("Users/getUser");
  };

  getUserByProjectId = (projectId) => {
    return this.get(`Users/getUserByProjectId?idProject=${projectId}`);
  };
}

export const userService = new UserService();
