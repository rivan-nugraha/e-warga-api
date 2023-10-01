import MeninggalController from "../../../controllers/transactions/MeninggalController/MeninggalController";
import RouteBase from "../../../routes/base/RouteBase";

export default class MeninggalRoutes extends RouteBase{
    constructor(){
        super(MeninggalController);
    }

    getRoutes () {
        this.buildRoute("/meninggal/insert-admin", "post", "insertDataTotalWarga", true);
        this.buildRoute("/meninggal/exist-data-admin", "get", "GetExistedDataMeninggal", true);

        return this.routes;
    }
}