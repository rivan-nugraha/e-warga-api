import ControllerBase from "../../../controllers/base/ControllerBase";

export default class DashboardController extends ControllerBase{
    async GetLaporanKependudukanBulanIni () {
        try {
            const query = this.query;

            const getYear = this.repository.global.service.dateFormat.getYear();
            const getDate = this.repository.global.service.dateFormat.getMonth();
            const TotalWarga = this.filtering(await this.repository.Warga.GetDashboardLaporanTotalWarga(getYear, getDate, query.rw), "Total Warga");
            const Datang = this.filtering(await this.repository.Datang.GetDashboardLaporanDatang(getYear, getDate, query.rw), "Datang");
            const Pindah = this.filtering(await this.repository.Pindah.GetDashboardLaporanPindah(getYear, getDate, query.rw), "Pindah");
            const Lahir = this.filtering(await this.repository.Lahir.GetDashboardLaporanLahir(getYear, getDate, query.rw), "Lahir");
            const Meninggal = this.filtering(await this.repository.Meninggal.GetDashboardLaporanMeninggal(getYear, getDate, query.rw), "Meninggal");

            const data = [
                ...TotalWarga,
                ...Datang,
                ...Pindah,
                ...Lahir,
                ...Meninggal,
            ]

            return this.success(data);
        } catch (error) {
            return this.error(error);
        }
    }

    private filtering (arr: any, kategori: string){
        if (arr.length === 0) {
            return [
                {
                    total: 0,
                    kategori
                }
            ];
        }else{
            return arr;
        }
    }
}