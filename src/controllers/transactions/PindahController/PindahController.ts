import ControllerBase from "../../../controllers/base/ControllerBase";

export default class PindahController extends ControllerBase {
  async insertDataPindah() {
    try {
      const body = this.body;
      const code_laporan =
        await this.repository.Pindah.generateKodeLaporanPindah(this.body.rw);
      const data = {
        kode_laporan_pindah: code_laporan,
        rw: body.rw,
        bulan: body.bulan,
        tahun: body.tahun,
        laki_laki: body.laki_laki,
        perempuan: body.perempuan,
      };

      const result = await this.repository.Pindah.insertPindah(data);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async GetPindahExistData() {
    try {
      const query = this.query;
      const result = await this.repository.Pindah.getPindahByBulan(query.rw);

      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async GetDataPindahByBulanAndTahun () {
    try {
      const query = this.query;
      const result = await this.repository.Pindah.GetDataPindahByBulanAndTahun(query.rw, query.tahun, query.bulan);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async EditDataPindah () {
    try {
      const body = this.body;
      const result = await this.repository.Pindah.EditDataPindah(body.rw, body.tahun, body.bulan, body.laki_laki, body.perempuan);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async InsertDataApp () {
    try {
      const body = this.body;
      const ExistedData = await this.repository.Pindah.GetDataPindahByBulanAndTahun(body.rw, body.tahun, body.bulan);
      let response: any;
      if(ExistedData.length > 0){
        response = await this.repository.Pindah.EditDataPindah(body.rw, body.tahun, body.bulan, body.laki_laki, body.perempuan);
      }else{
        const code_laporan = await this.repository.Pindah.generateKodeLaporanPindah(body.rw);
        const data = {
          kode_laporan_pindah: code_laporan,
          rw: this.body.rw,
          bulan: this.body.bulan,
          tahun: this.body.tahun,
          laki_laki: this.body.laki_laki,
          perempuan: this.body.perempuan,
        }
        response = await this.repository.Pindah.insertPindah(data);
      }
      return this.success(response);
    } catch (error) {
      return this.error(error);
    }
  }
}
