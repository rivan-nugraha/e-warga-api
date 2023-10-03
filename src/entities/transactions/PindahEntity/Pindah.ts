import { Schema, model } from "mongoose";

export default class Pindah {
  constructor() {
    const PindahSchema = new Schema({
      kode_laporan_pindah: { type: String, require: true },
      rw: { type: String, require: true },
      bulan: { type: String, require: true },
      tahun: { type: String, require: true },
      laki_laki: { type: Number, require: true },
      perempuan: { type: Number, require: true },
    });

    PindahSchema.index({ kode_laporan_pindah: 1 }, { unique: true });
    const Pindah = model("tt_pindah", PindahSchema, "tt_pindah");
    return Pindah;
  }
}
