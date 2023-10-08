import ControllerBase from "../../../controllers/base/ControllerBase";

export default class LahirController extends ControllerBase {
  async insertDataLahir() {
    try {
      const code_laporan = await this.repository.Lahir.generateKodeLaporanLahir(
        this.body.rw
      );
      const data = {
        kode_laporan_lahir: code_laporan,
        rw: this.body.rw,
        bulan: this.body.bulan,
        tahun: this.body.tahun,
        laki_laki: this.body.laki_laki,
        perempuan: this.body.perempuan,
      };

      const result = await this.repository.Lahir.insertLahir(data);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async getLahirExistData() {
    try {
      const query = this.query;
      const result = await this.repository.Lahir.getLahirByBulan(query.rw);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async GetDataLahirByBulanAndTahun () {
    try {
      const query = this.query;
      const result = await this.repository.Lahir.GetDataLahirByBulanAndTahun(query.rw, query.tahun, query.bulan);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async EditDataLahir () {
    try {
      const body = this.body;
      const result = await this.repository.Lahir.EditDataLahir(body.rw, body.tahun, body.bulan, body.laki_laki, body.perempuan);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async InsertDataApp () {
    try {
      const body = this.body;
      const ExistedData = await this.repository.Lahir.GetDataLahirByBulanAndTahun(body.rw, body.tahun, body.bulan);
      let response: any;
      if (ExistedData.length > 0) {
        response = await this.repository.Lahir.EditDataLahir(body.rw, body.tahun, body.bulan, Number(body.laki_laki), Number(body.perempuan));
      } else {
        const code_laporan = await this.repository.Lahir.generateKodeLaporanLahir(
          this.body.rw
        );
        const data = {
          kode_laporan_lahir: code_laporan,
          rw: this.body.rw,
          bulan: this.body.bulan,
          tahun: this.body.tahun,
          laki_laki: Number(this.body.laki_laki),
          perempuan: Number(this.body.perempuan),
        };
  
        response = await this.repository.Lahir.insertLahir(data);
      }

      return this.success(response);
    } catch (error) {
      return this.error(error);
    }
  }
}
