import { baseService } from "./baseService";

class CommentService extends baseService {
  constructor() {
    super();
  }

  insertComment = (cmtModel) => {
    return this.post("Comment/insertComment", cmtModel);
  };

  getAllComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };
}

export const commentService = new CommentService();
