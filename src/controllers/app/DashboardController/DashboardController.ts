import ControllerBase from "../../../controllers/base/ControllerBase";

export default class DashboardController extends ControllerBase{
    async GetLaporanKependudukanBulanIni () {
        try {
            const query = this.query;

            const getYear = this.repository.global.service.dateFormat.getYear();
            const getDate = this.repository.global.service.dateFormat.getMonth();
            const TotalWarga = this.filtering(await this.repository.Warga.GetDashboardLaporanTotalWarga(getYear, getDate, query.rw), "Total");
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

    async GetDashboardWeb () {
        try {
            const month = await this.repository.global.service.dateFormat.getMonth();
            const lahir = await this.repository.Lahir.GetCardTotalLahirByMonth(month);
            const meninggal = await this.repository.Meninggal.GetCardTotalMeninggalByMonth(month);
            const datang = await this.repository.Datang.GetCardTotalDatangByMonth(month);
            const pindah = await this.repository.Pindah.GetCardTotalPindahByMonth(month);
            const data = {
                lahir: this._filteringCard(lahir),
                meninggal: this._filteringCard(meninggal),
                datang: this._filteringCard(datang),
                pindah: this._filteringCard(pindah)
            };
            return this.success(data);
        } catch (error) {
            return this.error(error);
        }
    }

    async GetDashboardLineChart () {
        try {
            const { rw } = this.body;
            const getYear = this.repository.global.service.dateFormat.getYear();
            const result = await this.repository.Warga.DashboardGetTotalWarga(getYear, rw);
            const lahir = await this.repository.Lahir.DashboardGetTotalLahir(getYear, rw);
            const meninggal = await this.repository.Meninggal.DashboardGetTotalMeninggal(getYear, rw);
            const datang = await this.repository.Datang.DashboardGetTotalDatang(getYear, rw);
            const pindah = await this.repository.Pindah.DashboardGetTotalPindah(getYear, rw);

            return this.success({result, lahir, meninggal, datang, pindah});
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

    private _filteringCard (data: any) {
        return Object.assign({
            _id: "-",
            total: 0
        }, data);
    }
}