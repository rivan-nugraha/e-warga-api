import UserController from "../../../controllers/masters/User/UserController";
import RouteBase from "../../../routes/base/RouteBase";

export default class UserRoutes extends RouteBase {
  constructor() {
    super(UserController);
  }

  getRoutes() {
    this.buildRoute("/user/login", "post", "loginUser", false);
    this.buildRoute("/user/register", "post", "registerUser", false);
    return this.routes;
  }
}
