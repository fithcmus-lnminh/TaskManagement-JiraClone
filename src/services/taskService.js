import { baseService } from "./baseService";

class TaskService extends baseService {
  constructor() {
    super();
  }

  createTask = (taskObj) => {
    return this.post("Project/createTask", taskObj);
  };

  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };

  updateTask = (taskUpdate) => {
    return this.post(`Project/updateTask`, taskUpdate);
  };
}

export const taskService = new TaskService();
