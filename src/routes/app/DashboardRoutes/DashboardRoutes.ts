import DashboardController from "../../../controllers/app/DashboardController/DashboardController";
import RouteBase from "../../../routes/base/RouteBase";

export default class DashboardRoutes extends RouteBase{
    constructor() {
        super(DashboardController);
    }

    getRoutes () {
        // Mobile Version
        this.buildRoute("/app/dashboard", "get", "GetLaporanKependudukanBulanIni", false)
        this.buildRoute("/app/dashboard/line-chart", "get", "GetDashboardLineChart", false);

        // Web Version
        this.buildRoute("/dashboard/card", "get", "GetDashboardWeb", true);
        this.buildRoute("/dashboard/line-chart", "get", "GetDashboardLineChart", true);
        
        return this.routes
    }
}