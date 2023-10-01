import { Schema, model } from "mongoose";

export default class Warga{
    constructor(){
        const WargaSchema = new Schema({
            kode_laporan_warga: {type: String, require: true},
            rw: {type: String, require: true},
            bulan: {type: String, require: true},
            tahun: {type: String, require: true},
            laki_laki: {type: String, require: true},
            perempuan: {type: String, require: true}
        });

        WargaSchema.index({kode_laporan_warga: 1}, {unique: true});
        const Warga = model("tt_warga", WargaSchema, "tt_warga");

        return Warga;
    }
}