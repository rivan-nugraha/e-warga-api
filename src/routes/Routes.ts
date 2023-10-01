import RoutesCollection from "./collections/RouteCollections";
import BarangRoutes from "./masters/Barang/BarangRoutes";
import UserRoutes from "./masters/User/UserRoutes";
import { SystemRoutes } from "./system/SystemRoutes";
import DatangRoutes from "./transactions/DatangRoutes/DatangRoutes";
import LahirRoutes from "./transactions/LahirRoutes/LahirRoutes";
import MeninggalRoutes from "./transactions/MeninggalRoutes/MeninggalRoutes";
import PindahRoutes from "./transactions/PindahRoutes/PindahRoutes";
import WargaRoutes from "./transactions/WargaRoutes/WargaRoutes";

class Routes{
    private routeBuilders: any[];
    public emitter: any;
    constructor(){
        this.routeBuilders = [
            new BarangRoutes(),
            new SystemRoutes(),
            new UserRoutes(),
            new WargaRoutes(),
            new MeninggalRoutes(),
            new LahirRoutes(),
            new DatangRoutes(),
            new PindahRoutes()
        ]
    }

    registerRoutes(
        registerRouteCallback: any,
        createRouteBoundAction: any,
        io: any
    ){
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