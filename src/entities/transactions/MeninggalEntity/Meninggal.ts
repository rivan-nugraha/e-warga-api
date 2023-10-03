import { Schema, model } from "mongoose";

export default class Meninggal {
  constructor() {
    const MeninggalSchema = new Schema({
      kode_laporan_meninggal: { type: String, require: true },
      rw: { type: String, require: true },
      bulan: { type: String, require: true },
      tahun: { type: String, require: true },
      laki_laki: { type: Number, require: true },
      perempuan: { type: Number, require: true },
    });

    MeninggalSchema.index({ kode_laporan_meninggal: 1 }, { unique: true });
    const Meninggal = model("tt_meninggal", MeninggalSchema, "tt_meninggal");

    return Meninggal;
  }
}
