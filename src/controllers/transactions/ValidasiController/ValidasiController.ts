import MonthConstant from "../../../constant/Month/MonthConstant";
import ControllerBase from "../../../controllers/base/ControllerBase";

export class ValidasiController extends ControllerBase{
    async ValidasiData () {
        try {
            const body = this.body
            const getMonthindex = MonthConstant.findIndex((data: any) => data === body.bulan);
            const NewMonth = MonthConstant[getMonthindex + 1];
            const code_laporan = await this.repository.Warga.generateKodeLaporanTotalWarga(this.body.rw);
            const data = {
                kode_laporan_warga: code_laporan,
                rw: this.body.rw,
                bulan: NewMonth,
                tahun: this.body.tahun,
                laki_laki: Number(body.tmpTotalLakiLaki),
                perempuan: Number(body.tmpTotalPerempuan),
            }
            await this.repository.Warga.insertWarga(data);

            return this.success("Berhasil Validasi");
        } catch (error) {
            return this.error(error);
        }

    }
}