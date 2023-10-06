import Pindah from "../../../entities/transactions/PindahEntity/Pindah";
import RepositoryBase from "../../../repositories/base/RepositoryBase";

export default class PindahRepositories extends RepositoryBase {
  private Pindah: any;
  constructor(db: any, jf: any, service: any) {
    const sendColumn = {};

    super(db, jf, service, sendColumn);
    this.Pindah = new Pindah();
  }

  async insertPindah(data: any) {
    const Pindah = new this.Pindah(data);
    await Pindah.save();
    return `Success Insert Pindah`;
  }

  async getPindahByBulan(rw: any) {
    const result = await this.Pindah.aggregate([
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

  async getLatestDataPindah(rw: string) {
    const result = await this.Pindah.aggregate([
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
          kode_laporan_pindah: 1,
        },
      },
    ]);

    return result;
  }

  async GetDataPindahByBulanAndTahun (rw: any, tahun: any, bulan: any) {
    const result = await this.Pindah.aggregate([
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

  async GetDashboardLaporanPindah (tahun: any, bulan: any, rw: any = "") {
    const rwOpts = rw === "" ? {} : {rw}
    const result = await this.Pindah.aggregate([
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
          kategori: "Pindah",
          total: 1,
        }
      }
    ]);

    return result;
  }

  async EditDataPindah (rw: any, tahun: any, bulan: any, laki_laki: number, perempuan: number) {
    await this.Pindah.updateMany({ rw, tahun, bulan }, { laki_laki, perempuan });
    return "Berhasil Edit Data Pindah";
  }

  async generateKodeLaporanPindah(rw: string) {
    const latest = await this.getLatestDataPindah(rw);
    const getCode = this._codeGenerator(latest, rw);

    return getCode;
  }

  private _codeGenerator(latest: any, rw: string) {
    let code: string;
    if (latest.length === 0) {
      code = `PH/${rw}/0001`;
    } else {
      const splited = latest[0].kode_laporan_pindah.split("/");
      code = `PH/${rw}/${String(Number(splited[2]) + 1).padStart(4, "0")}`;
    }

    return code;
  }

  async GetLaporanKependudukanPindah(bulan: any, tahun: any) {
    const result = await this.Pindah.aggregate([
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
          laki_laki_pindah: "$laki_laki",
          perempuan_pindah: "$perempuan"
        }
      }
    ]);

    return result;
  }
}
