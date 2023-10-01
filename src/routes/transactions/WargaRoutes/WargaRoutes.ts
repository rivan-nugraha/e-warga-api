import WargaController from "../../../controllers/transactions/WargaController/WargaController";
import RouteBase from "../../base/RouteBase";

export default class WargaRoutes extends RouteBase{
    constructor(){
        super(WargaController)
    }

    getRoutes () {
        this.buildRoute("/warga/insert-admin", "post", "insertDataTotalWarga", true);
        this.buildRoute("/warga/exist-data-admin", "get", "getWargaExistData", true);

        return this.routes;
    }
}