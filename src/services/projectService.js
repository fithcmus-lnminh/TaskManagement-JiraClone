import { baseService } from "./baseService";

class ProjectService extends baseService {
  constructor() {
    super();
  }

  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };

  getProjectDetail = (id) => {
    return this.get(`/Project/getProjectDetail?id=${id}`);
  };

  getAllProject = () => {
    return this.get("/Project/getAllProject");
  };

  getAllTaskType = () => {
    return this.get("/TaskType/getAll");
  };

  getAllPriority = () => {
    return this.get("/Priority/getAll");
  };
}

export const projectService = new ProjectService();
