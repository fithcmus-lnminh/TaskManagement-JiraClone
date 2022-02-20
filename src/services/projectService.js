import { baseService } from "./baseService";

class ProjectService extends baseService {
  constructor() {
    super();
  }

  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };

  getProjectDetail = (id) => {
    return this.get(`Project/getProjectDetail?id=${id}`);
  };
}

export const projectService = new ProjectService();
