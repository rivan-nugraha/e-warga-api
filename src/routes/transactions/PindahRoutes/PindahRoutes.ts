import PindahController from "../../../controllers/transactions/PindahController/PindahController";
import RouteBase from "../../../routes/base/RouteBase";

export default class PindahRoutes extends RouteBase {
  constructor() {
    super(PindahController);
  }

  getRoutes() {
    this.buildRoute("/pindah/insert-admin", "post", "insertDataPindah", true);
    this.buildRoute(
      "/pindah/exist-data-admin",
      "get",
      "GetPindahExistData",
      true
    );
    this.buildRoute("/pindah/get-pindah", "get", "GetDataPindahByBulanAndTahun", true);
    this.buildRoute("/pindah/edit-pindah", "put", "EditDataPindah", true);

    return this.routes;
  }
}
