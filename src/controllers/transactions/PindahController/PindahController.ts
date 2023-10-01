import ControllerBase from "../../../controllers/base/ControllerBase";

export default class PindahController extends ControllerBase{
    async insertDataPindah () {
        try {
            const body = this.body
            const code_laporan = await this.repository.Pindah.generateKodeLaporanPindah(this.body.rw);
            const data = {
                kode_laporan_pindah: code_laporan,
                rw: body.rw,
                bulan: body.bulan,
                tahun: body.tahun,
                laki_laki: body.laki_laki,
                perempuan: body.perempuan
            }

            const result = await this.repository.Pindah.insertPindah(data);
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }

    async GetPindahExistData () {
        try {
            const query = this.query;
            const result = await this.repository.Pindah.getPindahByBulan(query.rw);

            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }
}