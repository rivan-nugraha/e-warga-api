import DashboardController from "../../../controllers/app/DashboardController/DashboardController";
import RouteBase from "../../../routes/base/RouteBase";

export default class DashboardRoutes extends RouteBase{
    constructor() {
        super(DashboardController);
    }

    getRoutes () {
        this.buildRoute("/app/dashboard", "get", "GetLaporanKependudukanBulanIni", false)

        return this.routes
    }
}