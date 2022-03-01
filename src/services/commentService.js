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

  deleteComment = (commentId) => {
    return this.delete(`Comment/deleteComment?idComment=${commentId}`);
  };

  updateComment = (cmtModel) => {
    return this.put(
      `Comment/updateComment?id=${cmtModel.commentId}&contentComment=${cmtModel.contentComment}`
    );
  };
}

export const commentService = new CommentService();
