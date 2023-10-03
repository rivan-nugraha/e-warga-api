import LaporanKependudukanController from "../../../controllers/report/LaporanKependudukanController/LaporanKependudukanController";
import RouteBase from "../../../routes/base/RouteBase";

export default class LaporanKependudukanRoutes extends RouteBase{
    constructor() {
        super(LaporanKependudukanController);
    }

    getRoutes() {
        this.buildRoute("/laporan-kependudukan", "get", "GetLaporanKependudukan", true);

        return this.routes;
    }
}