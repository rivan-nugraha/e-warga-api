import Lahir from "../../../entities/transactions/LahirEntity/Lahir";
import RepositoryBase from "../../../repositories/base/RepositoryBase";

export default class LahirRepositories extends RepositoryBase {
  private Lahir: any;
  constructor(db: any, jf: any, service: any) {
    const sendColumn = {};

    super(db, jf, service, sendColumn);
    this.Lahir = new Lahir();
  }

  async insertLahir(data: any) {
    const Lahir = new this.Lahir(data);
    await Lahir.save();
    return `Success Insert Lahir`;
  }

  async getLahirByBulan(rw: any) {
    const result = await this.Lahir.aggregate([
      {
        $match: {
          rw,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return result;
  }

  async getLatestDataLahir(rw: string) {
    const result = await this.Lahir.aggregate([
      {
        $match: {
          rw,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          kode_laporan_lahir: 1,
        },
      },
    ]);

    return result;
  }

  async GetDataLahirByBulanAndTahun (rw: any, tahun: any, bulan: any){
    const result = await this.Lahir.aggregate([
      {
        $match: {
          rw,
          tahun,
          bulan
        }
      },
      {
        $sort: {
          _id: 1,
        }
      }
    ]);

    return result;
  }

  async GetDashboardLaporanLahir (tahun: any, bulan: any, rw: any = "") {
    const rwOpts = rw === "" ? {} : {rw}
    const result = await this.Lahir.aggregate([
      {
        $match: {
          ...rwOpts,
          tahun,
          bulan
        }
      },
      {
        $addFields: {
          total: {$sum: ["$laki_laki", "$perempuan"]}
        }
      },
      {
        $project: {
          _id: 0,
          kategori: "Lahir",
          total: 1,
        }
      }
    ]);

    return result;
  }

  async EditDataLahir(rw: any, tahun: any, bulan: any, laki_laki: number, perempuan: number) {
    await this.Lahir.updateMany({ rw, tahun, bulan }, {laki_laki, perempuan});
    return "Berhasil Edit Data Lahir";
  }

  async generateKodeLaporanLahir(rw: string) {
    const latest = await this.getLatestDataLahir(rw);
    const getCode = this._codeGenerator(latest, rw);

    return getCode;
  }

  private _codeGenerator(latest: any, rw: string) {
    let code: string;
    if (latest.length === 0) {
      code = `LH/${rw}/0001`;
    } else {
      const splited = latest[0].kode_laporan_lahir.split("/");
      code = `LH/${rw}/${String(Number(splited[2]) + 1).padStart(4, "0")}`;
    }

    return code;
  }

  async GetLaporanKependudukanLahir(bulan: any, tahun: any) {
    const result = await this.Lahir.aggregate([
      {
        $match: {
          bulan,
          tahun
        }
      },
      {
        $project: {
          _id: 0,
          rw: 1,
          laki_laki_lahir: "$laki_laki",
          perempuan_lahir: "$perempuan"
        }
      }
    ]);

    return result
  }
}
