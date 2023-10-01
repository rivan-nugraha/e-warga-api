import DatangController from "../../../controllers/transactions/DatangController/DatangController";
import RouteBase from "../../../routes/base/RouteBase";

export default class DatangRoutes extends RouteBase{
    constructor(){
        super(DatangController);
    }

    getRoutes(){
        this.buildRoute("/datang/insert-admin", "post", "insertDataDatang", true);
        this.buildRoute("/datang/exist-data-admin", "get", "GetExistedDataDatang", true);

        return this.routes;
    }
}