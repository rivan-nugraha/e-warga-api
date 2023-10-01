import Lahir from "../../../entities/transactions/LahirEntity/Lahir";
import RepositoryBase from "../../../repositories/base/RepositoryBase";


export default class LahirRepositories extends RepositoryBase{
    private Lahir: any;
    constructor(db: any, jf: any, service: any){
        const sendColumn = {

        }

        super(db, jf, service, sendColumn);
        this.Lahir = new Lahir;
    }

    async insertLahir (data: any) {
        const Lahir = new this.Lahir(data);
        await Lahir.save();
        return `Success Insert Lahir`;
    }

    async getLahirByBulan (rw: any) {
        const result = await this.Lahir.aggregate([
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
        ])
        
        return result;
    }

    async getLatestDataLahir (rw: string) {
        const result = await this.Lahir.aggregate([
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
                $project: {
                    kode_laporan_lahir: 1,
                }
            }
        ]);

        return result;
    }

    async generateKodeLaporanLahir (rw: string) {
        const latest = await this.getLatestDataLahir(rw);
        const getCode = this._codeGenerator(latest, rw);

        return getCode;
    }

    private _codeGenerator (latest: any, rw: string) {
        let code: string;
        if(latest.length === 0){
            code = `LH/${rw}/0001`;
        }else{
            const splited = latest[0].kode_laporan_warga.split("/")
            code = `LH/${rw}/${String(Number(splited[2]) + 1).padStart(4, "0")}`
        }

        return code;
    }
}