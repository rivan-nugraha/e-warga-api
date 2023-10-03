import RepositoryBase from "./base/RepositoryBase";

// Masters
import BarangRepositories from "./masters/BarangRepositories/BarangRepositories";
import UserRepositories from "./masters/UserRepositories/UserRepositories";

// Transaction
import WargaRepositories from "./transactions/WargaRepositories/WargaRepositories";
import SystemRepositories from "./system/SystemRepositories";
import PindahRepositories from "./transactions/PindahRepositories/PindahRepositories";
import DatangRepositories from "./transactions/DatangRepositories/DatangRepositories";
import LahirRepositories from "./transactions/LahirRepositories/LahirRepositories";
import MeninggalRepositories from "./transactions/MeninggalRepositories/MeninggalRepositories";

class Repository {
  private _db: any;
  private _jf: any;
  private _service: any;

  public global: RepositoryBase;
  public barang: BarangRepositories;
  public system: SystemRepositories;
  public User: UserRepositories;

  public Warga: WargaRepositories;
  public Pindah: PindahRepositories;
  public Datang: DatangRepositories;
  public Lahir: LahirRepositories;
  public Meninggal: MeninggalRepositories;

  constructor(db: any, jf: any, service: any) {
    this._db = db;
    this._jf = jf;
    this._service = service;
  }

  registerRepositories() {
    this.global = new RepositoryBase(this._db, this._jf, this._service, []);
    this.barang = new BarangRepositories(this._db, this._jf, this._service);
    this.system = new SystemRepositories(this._db, this._jf, this._service);
    this.User = new UserRepositories(this._db, this._jf, this._service);

    this.Warga = new WargaRepositories(this._db, this._jf, this._service);
    this.Pindah = new PindahRepositories(this._db, this._jf, this._service);
    this.Datang = new DatangRepositories(this._db, this._jf, this._service);
    this.Lahir = new LahirRepositories(this._db, this._jf, this._service);
    this.Meninggal = new MeninggalRepositories(
      this._db,
      this._jf,
      this._service
    );
  }
}

export default Repository;
