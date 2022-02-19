import { baseService } from "./baseService";

class UserService extends baseService {
  constructor() {
    super();
  }

  getUserByKeyword = (keyword) => {
    return this.get(`/Users/getUser?keyword=${keyword}`);
  };
}

export const userService = new UserService();
