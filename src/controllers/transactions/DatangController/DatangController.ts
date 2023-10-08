import ControllerBase from "../../../controllers/base/ControllerBase";

export default class DatangController extends ControllerBase {
  async insertDataDatang() {
    try {
      const code_laporan =
        await this.repository.Datang.generateKodeLaporanDatang(this.body.rw);
      const data = {
        kode_laporan_datang: code_laporan,
        rw: this.body.rw,
        bulan: this.body.bulan,
        tahun: this.body.tahun,
        laki_laki: this.body.laki_laki,
        perempuan: this.body.perempuan,
      };

      const result = await this.repository.Datang.insertDatang(data);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async GetExistedDataDatang () {
    try {
      const query = this.query;
      const result = await this.repository.Datang.getDatangByBulan(query.rw);

      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async GetDataDatangByBulanAndTahun () {
    try {
        const query = this.query
        const result = await this.repository.Datang.GetDataDatangByBulanAndTahun(query.rw, query.tahun, query.bulan);
      return this.success(result);
    } catch (error) {
        return this.error(error);
    }
  }

  async EditDataDatang () {
    try {
      const body = this.body;
      const result = await this.repository.Datang.EditDataDatang(body.rw, body.tahun, body.bulan, body.laki_laki, body.perempuan);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async InsertDataApp () {
    try {
      const body = this.body;
      const ExistedData = await this.repository.Datang.GetDataDatangByBulanAndTahun(body.rw, body.tahun, body.bulan);
      let response: any;
      if(ExistedData.length > 0){
        response = await this.repository.Datang.EditDataDatang(body.rw, body.tahun, body.bulan, body.laki_laki, body.perempuan);
      }else{
        const code_laporan = await this.repository.Datang.generateKodeLaporanDatang(body.rw);
        const data = {
          kode_laporan_datang: code_laporan,
          rw: this.body.rw,
          bulan: this.body.bulan,
          tahun: this.body.tahun,
          laki_laki: this.body.laki_laki,
          perempuan: this.body.perempuan,
        }

        response = await this.repository.Datang.insertDatang(data);
      }

      return this.success(response);
    } catch (error) {
      return this.error(error);
    }
  }
}
