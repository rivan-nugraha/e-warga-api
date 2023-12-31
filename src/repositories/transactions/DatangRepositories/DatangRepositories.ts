import Datang from "../../../entities/transactions/DatangEntity/Datang";
import RepositoryBase from "../../../repositories/base/RepositoryBase";

export default class DatangRepositories extends RepositoryBase {
  private Datang: any;
  constructor(db: any, jf: any, service: any) {
    const sendColumn = {};

    super(db, jf, service, sendColumn);
    this.Datang = new Datang();
  }

  async insertDatang(data: any) {
    const Datang = new this.Datang(data);
    await Datang.save();
    return `Success Insert Datang`;
  }

  async getDatangByBulan(rw: any) {
    const result = await this.Datang.aggregate([
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

  async GetDataDatangByBulanAndTahun (rw: any, tahun: any, bulan: any) {
    const result = await this.Datang.aggregate([
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

  async EditDataDatang (rw: any, tahun: any, bulan: any, laki_laki: number, perempuan: number) {
    await this.Datang.updateMany({ rw, tahun, bulan }, { laki_laki, perempuan });
    return "Berhasil Edit Data Datang"
  }

  async GetDashboardLaporanDatang (tahun: any, bulan: any, rw: any = "") {
    const rwOpts = rw === "" ? {} : {rw}
    const result = await this.Datang.aggregate([
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
          kategori: "Datang",
          total: 1,
        }
      }
    ]);

    return result;
  }

  async getLatestDataDatang(rw: string) {
    const result = await this.Datang.aggregate([
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
          kode_laporan_datang: 1,
        },
      },
    ]);

    return result;
  }

  async generateKodeLaporanDatang(rw: string) {
    const latest = await this.getLatestDataDatang(rw);
    const getCode = this._codeGenerator(latest, rw);

    return getCode;
  }

  private _codeGenerator(latest: any, rw: string) {
    let code: string;
    if (latest.length === 0) {
      code = `DG/${rw}/0001`;
    } else {
      const splited = latest[0].kode_laporan_datang.split("/");
      code = `DG/${rw}/${String(Number(splited[2]) + 1).padStart(4, "0")}`;
    }

    return code;
  }

  async GetLaporanKependudukanDataDatang(bulan: any, tahun: any){
    const result = await this.Datang.aggregate([
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
          laki_laki_datang: "$laki_laki",
          perempuan_datang: "$perempuan",
        }
      }
    ]);

    return result;
  }

  async GetLaporanKependudukanDataDatangPerRW(bulan: any, tahun: any, rw: any){
    const result = await this.Datang.aggregate([
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
          laki_laki_datang: "$laki_laki",
          perempuan_datang: "$perempuan",
        }
      }
    ]);

    return result;
  }

  async GetCardTotalDatangByMonth (bulan: any) {
    return (await this.Datang.aggregate([
      {
        $match: {
          bulan
        }
      },
      {
        $addFields: {
          total: { $sum: ["$laki_laki", "$perempuan"] }
        }
      },
      {
        $group: {
          _id: "$bulan",
          total: { $sum: "$total" }
        }
      }
    ]))[0];
  }

  async DashboardGetTotalDatang (tahun: string, rw: string = "ALL") {
    const rwOpts = rw === "ALL" ? {} : {rw};
    const result = await this.Datang.aggregate([
      {
        $match: {
          tahun,
          ...rwOpts
        }
      },
      {
        $addFields: {
          total: {$sum: ["$laki_laki", "$perempuan"]}
        }
      },
      {
        $group: {
          _id: "$bulan",
          bulan: {$first: "$bulan"},
          tahun: {$first: "$tahun"},
          total: {$sum: "$total"}
        }
      },
    ]);

    return result;
  }
}
