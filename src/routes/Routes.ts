import DashboardRoutes from "./app/DashboardRoutes/DashboardRoutes";
import RoutesCollection from "./collections/RouteCollections";
import BarangRoutes from "./masters/Barang/BarangRoutes";
import UserRoutes from "./masters/User/UserRoutes";
import LaporanKependudukanRoutes from "./report/LaporanKependudukanRoutes/LaporanKependudukanRoutes";
import { SystemRoutes } from "./system/SystemRoutes";
import DatangRoutes from "./transactions/DatangRoutes/DatangRoutes";
import LahirRoutes from "./transactions/LahirRoutes/LahirRoutes";
import MeninggalRoutes from "./transactions/MeninggalRoutes/MeninggalRoutes";
import PindahRoutes from "./transactions/PindahRoutes/PindahRoutes";
import ValidasiRoutes from "./transactions/ValidasiRoutes/ValidasiRoutes";
import WargaRoutes from "./transactions/WargaRoutes/WargaRoutes";

class Routes {
  private routeBuilders: any[];
  public emitter: any;
  constructor() {
    this.routeBuilders = [
      // Master And Input
      new BarangRoutes(),
      new SystemRoutes(),
      new UserRoutes(),
      new WargaRoutes(),
      new MeninggalRoutes(),
      new LahirRoutes(),
      new DatangRoutes(),
      new PindahRoutes(),

      // Laporan
      new LaporanKependudukanRoutes(),
      new ValidasiRoutes(),

      // Apps
      new DashboardRoutes(),
    ];
  }

  registerRoutes(
    registerRouteCallback: any,
    createRouteBoundAction: any,
    io: any
  ) {
    this.routeBuilders.map((builder: any) => {
      const routes = builder.getRoutes();
      routes.map((routeData: any) => {
        RoutesCollection.addRouteData(
          routeData.controllerClass,
          routeData.action,
          {
            uri: routeData.uri,
            httpMethod: routeData.httpMethod,
          }
        );
        const boundAction = createRouteBoundAction(
          routeData.controllerClass,
          routeData.action,
          routeData.isSecure,
          routeData.isFile,
          io
        );
        registerRouteCallback(
          routeData.uri,
          routeData.httpMethod,
          boundAction,
          io
        );
      });
    });
  }
}

export default Routes;
