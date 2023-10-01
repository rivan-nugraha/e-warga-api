import { Schema, model } from "mongoose";

export default class Datang {
    constructor(){
        const DatangSchema = new Schema({
            kode_laporan_datang: {type: String, require: true},
            rw: {type: String, require: true},
            bulan: {type: String, require: true},
            tahun: {type: String, require: true},
            laki_laki: {type: String, require: true},
            perempuan: {type: String, require: true}
        });

        DatangSchema.index({kode_laporan_datang: 1}, { unique: true });
        const Datang = model("tt_datang", DatangSchema, "tt_datang");
        return Datang;
    }
}