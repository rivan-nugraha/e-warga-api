import ControllerBase from "../../../controllers/base/ControllerBase";

export default class MeninggalController extends ControllerBase {
  async insertDataMeninggal() {
    try {
      const code_laporan =
        await this.repository.Meninggal.generateKodeLaporanMeninggal(
          this.body.rw
        );
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

  async GetExistedDataMeninggal() {
    try {
      const query = this.query;
      const result = await this.repository.Meninggal.getMeninggalByBulan(
        query.rw
      );

      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async GetDataMeninggalByBulanAndTahun () {
    try {
      const query = this.query;
      const result = await this.repository.Meninggal.GetDataMeninggalByBulanAndTahun(query.rw, query.tahun, query.bulan);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async EditDataMeninggal () {
    try {
      const body = this.body;
      const result = await this.repository.Meninggal.EditDataMeninggal(body.rw, body.tahun, body.bulan, body.laki_laki, body.perempuan);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async InsertDataApp () {
    try {
      const body = this.body;
      const ExistedData = await this.repository.Meninggal.GetDataMeninggalByBulanAndTahun(body.rw, body.tahun, body.bulan);
      let response: any;
      if (ExistedData.length > 0) {
        response = await this.repository.Meninggal.EditDataMeninggal(body.rw, body.tahun, body.bulan, body.laki_laki, body.perempuan);
      } else {
        const code_laporan = await this.repository.Meninggal.generateKodeLaporanMeninggal(
          this.body.rw
        );
        const data = {
          kode_laporan_meninggal: code_laporan,
          rw: this.body.rw,
          bulan: this.body.bulan,
          tahun: this.body.tahun,
          laki_laki: this.body.laki_laki,
          perempuan: this.body.perempuan,
        };
  
        response = await this.repository.Meninggal.insertMeninggal(data);
      }

      return this.success(response);
    } catch (error) {
      return this.error(error);
    }
  }
}
