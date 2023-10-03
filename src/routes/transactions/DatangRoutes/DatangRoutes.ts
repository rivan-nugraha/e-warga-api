import DatangController from "../../../controllers/transactions/DatangController/DatangController";
import RouteBase from "../../../routes/base/RouteBase";

export default class DatangRoutes extends RouteBase {
  constructor() {
    super(DatangController);
  }

  getRoutes() {
    this.buildRoute("/datang/insert-admin", "post", "insertDataDatang", true);
    this.buildRoute(
      "/datang/exist-data-admin",
      "get",
      "GetExistedDataDatang",
      true
    );
    this.buildRoute("/datang/get-datang", "get", "GetDataDatangByBulanAndTahun", true);
    this.buildRoute("/datang/edit-datang", "put", "EditDataDatang", true);

    return this.routes;
  }
}
