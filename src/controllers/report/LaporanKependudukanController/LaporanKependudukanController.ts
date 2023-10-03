import ControllerBase from "../../../controllers/base/ControllerBase";

export default class LaporanKependudukanController extends ControllerBase{
    async GetLaporanKependudukan () {
        try {
            const { bulan, tahun } = this.query;
            const result: any[] = [];
            const TotalWarga = await this.repository.Warga.GetLaporanKependudukanTotalWarga(bulan, tahun);
            result.push(...TotalWarga);
            const Datang = await this.repository.Datang.GetLaporanKependudukanDataDatang(bulan, tahun);
            result.push(...Datang);
            const Lahir = await this.repository.Lahir.GetLaporanKependudukanLahir(bulan, tahun);
            result.push(...Lahir);
            const Meninggal = await this.repository.Meninggal.GetLaporanKependudukanMeninggal(bulan, tahun);
            result.push(...Meninggal);
            const Pindah = await this.repository.Pindah.GetLaporanKependudukanPindah(bulan, tahun);
            result.push(...Pindah);

            const resultReduced = result.reduce((a: any[], b: any) => {
                const existedIndex = a.findIndex((data: any) => data.rw === b.rw);
                if (existedIndex < 0) {
                    a.push({
                        rw: b.rw,
                        laki_laki_total: b.laki_laki_total || 0,
                        perempuan_total: b.perempuan_total || 0,
                        laki_laki_datang: b.laki_laki_datang || 0,
                        perempuan_datang: b.perempuan_datang || 0,
                        laki_laki_lahir: b.laki_laki_lahir || 0,
                        perempuan_lahir: b.perempuan_lahir || 0,
                        laki_laki_meninggal: b.laki_laki_meninggal || 0,
                        perempuan_meninggal: b.perempuan_meninggal || 0,
                        laki_laki_pindah: b.laki_laki_pindah || 0,
                        perempuan_pindah: b.perempuan_pindah || 0,
                    })
                }else{
                    a[existedIndex].laki_laki_total += b.laki_laki_total || 0;
                    a[existedIndex].perempuan_total += b.perempuan_total || 0;
                    a[existedIndex].laki_laki_datang += b.laki_laki_datang || 0;
                    a[existedIndex].perempuan_datang += b.perempuan_datang || 0;
                    a[existedIndex].laki_laki_lahir += b.laki_laki_lahir || 0;
                    a[existedIndex].perempuan_lahir += b.perempuan_lahir || 0;
                    a[existedIndex].laki_laki_meninggal += b.laki_laki_meninggal || 0;
                    a[existedIndex].perempuan_meninggal += b.perempuan_meninggal || 0;
                    a[existedIndex].laki_laki_pindah += b.laki_laki_pindah || 0;
                    a[existedIndex].perempuan_pindah += b.perempuan_pindah || 0;
                }

                return a
            }, [])

            return this.success(resultReduced);
        } catch (error) {
            return this.error(error);
        }
    }
}