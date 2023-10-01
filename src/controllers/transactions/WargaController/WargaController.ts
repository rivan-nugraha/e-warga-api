import ControllerBase from "../../../controllers/base/ControllerBase";


export default class WargaController extends ControllerBase{
    async insertDataTotalWarga () {
        try {
            const code_laporan = await this.repository.Warga.generateKodeLaporanTotalWarga(this.body.rw);
            const data = {
                kode_laporan_warga: code_laporan,
                rw: this.body.rw,
                bulan: this.body.bulan,
                tahun: this.body.tahun,
                laki_laki: this.body.laki_laki,
                perempuan: this.body.perempuan
            }

            const result = await this.repository.Warga.insertWarga(data);
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }

    async getWargaExistData () {
        try {
            const query = this.query;
            const result = await this.repository.Warga.getWargaByBulan(query.rw);
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }
}