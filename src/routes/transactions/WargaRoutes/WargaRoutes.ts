import WargaController from "../../../controllers/transactions/WargaController/WargaController";
import RouteBase from "../../base/RouteBase";

export default class WargaRoutes extends RouteBase {
  constructor() {
    super(WargaController);
  }

  getRoutes() {
    this.buildRoute(
      "/warga/insert-admin",
      "post",
      "insertDataTotalWarga",
      true
    );
    
    this.buildRoute(
      "/warga/exist-data-admin",
      "get",
      "getWargaExistData",
      true
    );

    this.buildRoute(
      "/warga/get-total",
      "get",
      "GetTotalWargaByBulanAndTahun",
      true
    );

    this.buildRoute(
      "/warga/edit-total",
      "put",
      "EditTotalWarga",
      true
    );

    // Dashboard
    this.buildRoute(
      "/dashboard/total-warga",
      "get",
      "DashboardGetTotalWarga",
      true
    )

    return this.routes;
  }
}
