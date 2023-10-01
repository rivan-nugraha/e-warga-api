import Pindah from "../../../entities/transactions/PindahEntity/Pindah";
import RepositoryBase from "../../../repositories/base/RepositoryBase";


export default class PindahRepositories extends RepositoryBase{
    private Pindah: any;
    constructor(db: any, jf: any, service: any){
        const sendColumn = {

        }

        super(db, jf, service, sendColumn);
        this.Pindah = new Pindah;
    }

    async insertPindah (data: any) {
        const Pindah = new this.Pindah(data);
        await Pindah.save();
        return `Success Insert Pindah`;
    }

    async getPindahByBulan (rw: any) {
        const result = await this.Pindah.aggregate([
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

    async getLatestDataPindah (rw: string) {
        const result = await this.Pindah.aggregate([
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
                    kode_laporan_pindah: 1
                }
            }
        ])
    }

    async generateKodeLaporanPindah (rw: string) {
        const latest = await this.getLatestDataPindah(rw);
        const getCode = this._codeGenerator(latest, rw);
    }

    private _codeGenerator (latest: any, rw: string) {
        let code: string;
        if(latest.length === 0){
            code = `PH/${rw}/0001`;
        }else{
            const splited = latest[0].kode_laporan_warga.split("/")
            code = `PH/${rw}/${String(Number(splited[2]) + 1).padStart(4, "0")}`
        }

        return code;
    }
}