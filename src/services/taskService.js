import { baseService } from "./baseService";

class TaskService extends baseService {
  constructor() {
    super();
  }

  createTask = (taskObj) => {
    return this.post("Project/createTask", taskObj);
  };
}

export const taskService = new TaskService();
