import Warga from "../../../entities/transactions/WargaEntity/Warga";
import RepositoryBase from "../../base/RepositoryBase";

export default class WargaRepositories extends RepositoryBase{
    private Warga: any;
    constructor(db: any, jf: any, service: any){
        const sendColumn = {

        }

        super(db, jf, service, sendColumn);
        this.Warga = new Warga;
    }

    async insertWarga (data: any) {
        const Warga = new this.Warga(data);
        await Warga.save();
        return `Success Insert Warga`
    }

    async getWargaByBulan (rw: any) {
        const result = await this.Warga.aggregate([
            {
                $match: {
                    rw,
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

    async getLatestDataWarga (rw: string) {
        const result = await this.Warga.aggregate([
            {
                $match: {
                    rw
                }
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $project:{
                    kode_laporan_warga: 1
                }
            }
        ]);

        return result;
    }

    async generateKodeLaporanTotalWarga (rw: string) {
        const latest = await this.getLatestDataWarga(rw);
        const getCode = this._codeGenerator(latest, rw);

        return getCode;
    }

    private _codeGenerator (latest: any, rw: string) {
        let code: string;
        if(latest.length === 0){
            code = `TW/${rw}/0001`;
        }else{
            const splited = latest[0].kode_laporan_warga.split("/")
            code = `TW/${rw}/${String(Number(splited[2]) + 1).padStart(4, "0")}`
        }

        return code;
    }
}