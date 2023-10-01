import ControllerBase from "../../../controllers/base/ControllerBase";


export default class MeninggalController extends ControllerBase{
    async insertDataMeninggal () {
        try {
            const code_laporan = await this.repository.Meninggal.generateKodeLaporanMeninggal(this.body.rw);
            const data = {
                kode_laporan_meninggal: code_laporan,
                rw: this.body.rw,
                bulan: this.body.bulan,
                tahun: this.body.tahun,
                laki_laki: this.body.laki_laki,
                perempuan: this.body.perempuan,
            };

            const result = await this.repository.Meninggal.insertMeninggal(data);
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }

    async GetExistedDataMeninggal () {
        try {
            const query = this.query;
            const result = await this.repository.Meninggal.getMeninggalByBulan(query.rw);
            
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }
}