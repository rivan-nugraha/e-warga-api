import { SuperUserMockData } from "../../mock/MasterAndSuperUserMockData";
import { SystemBodyIgnore } from "../../constant/formated/ignore/system-ignore";
import ControllerBase from "../base/ControllerBase";
import { UserMockData } from "../../mock/UserMockData";
const VERSION = require("../../../version.json");

export default class SystemController extends ControllerBase {
  async getSystem() {
    try {
      const result = await this.repository.system.getSystem();
      return this.success({
        ...result,
        version: `${VERSION.major}.${VERSION.minor}.${VERSION.patch}.${VERSION.server}`,
      });
    } catch (error) {
      return this.error(error);
    }
  }

  async installSystem() {
    try {
      const checkSystem = await this.repository.system.getSystem();
      if (checkSystem) {
        throw new Error(
          "Failed Install System Because There's Installed System On Database"
        );
      }

      const formatedBody =
        await this.repository.global.service.formatStringObject.format(
          this.body,
          SystemBodyIgnore
        );

      if (formatedBody.kode_toko.length > 3) {
        throw new Error(`Kode Toko Tidak Bisa Lebih Dari 3 Huruf`);
      } else if (formatedBody.kode_toko.length <= 0) {
        throw new Error(`Harap Isi Kode Toko`);
      }

      const data = {
        tgl_system: this.repository.global.service.dateFormat.localDate(),
        kode_toko: formatedBody.kode_toko,
        nama_toko: formatedBody.nama_toko,
        alamat_toko: formatedBody.alamat_toko,
        no_telp: formatedBody.no_telp,
        no_whatsapp: formatedBody.no_whatsapp,
        installed_date: this.repository.global.service.dateFormat.localDate(),
      };

      const result = await this.repository.system.registerSystem(data);
      return this.success(result);
    } catch (error) {
      return this.error(error);
    }
  }

  async addUser() {
    try {
      for (const index in SuperUserMockData) {
        SuperUserMockData[index].password =
          await this.repository.global.service.UserService.hashPassword(
            SuperUserMockData[index].password
          );
        await this.repository.User.insertUser(SuperUserMockData[index]);
      }
      for (const index in UserMockData) {
        UserMockData[index].password = await this.repository.global.service.UserService.hashPassword(
          UserMockData[index].password
        );
        await this.repository.User.insertUser(UserMockData[index]);
      }
      return this.success(`Success Adding User`);
    } catch (error) {
      return this.error(error);
    }
  }
}
