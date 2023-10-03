import { Schema, model } from "mongoose";

export default class Lahir {
  constructor() {
    const LahirSchema = new Schema({
      kode_laporan_lahir: { type: String, require: true },
      rw: { type: String, require: true },
      bulan: { type: String, require: true },
      tahun: { type: String, require: true },
      laki_laki: { type: Number, require: true },
      perempuan: { type: Number, require: true },
    });

    LahirSchema.index({ kode_laporan_lahir: 1 }, { unique: true });
    const Lahir = model("tt_lahir", LahirSchema, "tt_lahir");
    return Lahir;
  }
}
