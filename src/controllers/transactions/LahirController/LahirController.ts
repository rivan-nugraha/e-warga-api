import ControllerBase from "../../../controllers/base/ControllerBase";

export default class LahirController extends ControllerBase{
    async insertDataLahir () {
        try {
            const code_laporan = await this.repository.Lahir.generateKodeLaporanLahir(this.body.rw);
            const data = {
                kode_laporan_lahir: code_laporan,
                rw: this.body.rw,
                bulan: this.body.bulan,
                tahun: this.body.tahun,
                laki_laki: this.body.laki_laki,
                perempuan: this.body.perempuan
            }

            const result = await this.repository.Lahir.insertLahir(data);
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }

    async getLahirExistData () {
        try{
            const query = this.query;
            const result = await this.repository.Lahir.getLahirByBulan(query.rw);
            return this.success(result);
        }catch(error){
            return this.error(error);
        }
    }
}