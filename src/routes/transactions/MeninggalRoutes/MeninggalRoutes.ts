import MeninggalController from "../../../controllers/transactions/MeninggalController/MeninggalController";
import RouteBase from "../../../routes/base/RouteBase";

export default class MeninggalRoutes extends RouteBase {
  constructor() {
    super(MeninggalController);
  }

  getRoutes() {
    this.buildRoute(
      "/meninggal/insert-admin",
      "post",
      "insertDataMeninggal",
      true
    );
    this.buildRoute(
      "/meninggal/exist-data-admin",
      "get",
      "GetExistedDataMeninggal",
      true
    );
    this.buildRoute(
      "/meninggal/get-meninggal",
      "get",
      "GetDataMeninggalByBulanAndTahun",
      true
    );
    this.buildRoute(
      "/meninggal/edit-meninggal",
      "put",
      "EditDataMeninggal",
      true
    )

    return this.routes;
  }
}
