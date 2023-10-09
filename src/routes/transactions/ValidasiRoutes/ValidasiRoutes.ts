import { ValidasiController } from "../../../controllers/transactions/ValidasiController/ValidasiController";
import RouteBase from "../../../routes/base/RouteBase";

export default class ValidasiRoutes extends RouteBase{
    constructor(){
        super(ValidasiController)
    }

    getRoutes () {
        this.buildRoute("/validasi", "post", "ValidasiData", true);
        
        return this.routes;
    }
}