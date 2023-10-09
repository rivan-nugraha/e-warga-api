import Meninggal from "../../../entities/transactions/MeninggalEntity/Meninggal";
import RepositoryBase from "../../../repositories/base/RepositoryBase";

export default class MeninggalRepositories extends RepositoryBase {
  private Meninggal: any;
  constructor(db: any, jf: any, service: any) {
    const sendColumn = {};

    super(db, jf, service, sendColumn);
    this.Meninggal = new Meninggal();
  }

  async insertMeninggal(data: any) {
    const Meninggal = new this.Meninggal(data);
    await Meninggal.save();
    return `Success Insert Meninggal`;
  }

  async getMeninggalByBulan(rw: any) {
    const result = await this.Meninggal.aggregate([
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

  async getLatestDataMeninggal(rw: string) {
    const result = await this.Meninggal.aggregate([
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
          kode_laporan_meninggal: 1,
        },
      },
    ]);

    return result;
  }

  async GetDataMeninggalByBulanAndTahun (rw: any, tahun: any, bulan: any) {
    const result = await this.Meninggal.aggregate([
      {
        $match: {
          rw,
          tahun,
          bulan
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);
    
    return result;
  }

  async GetDashboardLaporanMeninggal (tahun: any, bulan: any, rw: any = "") {
    const rwOpts = rw === "" ? {} : {rw}
    const result = await this.Meninggal.aggregate([
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
          kategori: "Meninggal",
          total: 1,
        }
      }
    ]);

    return result;
  }

  async EditDataMeninggal (rw: any, tahun: any, bulan: any, laki_laki: number, perempuan: number) {
    await this.Meninggal.updateMany({ rw, tahun, bulan }, {laki_laki, perempuan});
    return "Berhasil Edit Data Meninggal";
  }

  async generateKodeLaporanMeninggal(rw: string) {
    const latest = await this.getLatestDataMeninggal(rw);
    const getCode = this._codeGenerator(latest, rw);

    return getCode;
  }

  private _codeGenerator(latest: any, rw: string) {
    let code: string;
    if (latest.length === 0) {
      code = `MG/${rw}/0001`;
    } else {
      const splited = latest[0].kode_laporan_meninggal.split("/");
      code = `MG/${rw}/${String(Number(splited[2]) + 1).padStart(4, "0")}`;
    }

    return code;
  }

  async GetLaporanKependudukanMeninggal (bulan: any, tahun: any) {
    const result = await this.Meninggal.aggregate([
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
          laki_laki_meninggal: "$laki_laki",
          perempuan_meninggal: "$perempuan"
        }
      }
    ]);

    return result;
  }

  async GetLaporanKependudukanMeninggalPerRW (bulan: any, tahun: any, rw: any) {
    const result = await this.Meninggal.aggregate([
      {
        $match: {
          bulan,
          tahun,
          rw
        }
      },
      {
        $project: {
          _id: 0,
          rw: 1,
          laki_laki_meninggal: "$laki_laki",
          perempuan_meninggal: "$perempuan"
        }
      }
    ]);

    return result;
  }
}
