import LahirController from "../../../controllers/transactions/LahirController/LahirController";
import RouteBase from "../../../routes/base/RouteBase";

export default class LahirRoutes extends RouteBase {
  constructor() {
    super(LahirController);
  }

  getRoutes() {
    this.buildRoute("/lahir/insert-admin", "post", "insertDataLahir", true);
    this.buildRoute(
      "/lahir/exist-data-admin",
      "get",
      "getLahirExistData",
      true
    );
    this.buildRoute("/lahir/get-lahir", "get", "GetDataLahirByBulanAndTahun", true);
    this.buildRoute("/lahir/edit-lahir", "put", "EditDataLahir", true);


    // Apps Endpoint
    this.buildRoute("/lahir/insert-app", "post", "InsertDataApp", true);

    return this.routes;
  }
}
