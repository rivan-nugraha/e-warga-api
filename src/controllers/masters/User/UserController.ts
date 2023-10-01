import ControllerBase from "../../../controllers/base/ControllerBase";

export default class UserController extends ControllerBase{
    async loginUser() {
        try {
            const { username, password } = this.body;
        
            // Check Existing User
            const user = await this.repository.User.getUser(username);
            if (!user) {
                return this.error({
                statusCode: 404,
                message: "Username Atau Password Salah",
                });
            }
        
            // Matching The Password
            const matchPassword =
                await this.repository.global.service.UserService.comparePassword(
                password,
                user
                );
            if (!matchPassword) {
                return this.error({
                statusCode: 404,
                message: "Username Atau Password Salah",
                });
            }
        
            // Generating Token
            const token = this.repository.global.service.security.generateToken(user);

            const result = {
                name: user.nama_user,
                level: user.level,
                img_url: user.img_url,
                access_token: token,
            };
    
            return this.success(result);
        } catch (error) {
            console.log(error);
            return this.error(error);
        }
    }
    
    async registerUser() {
        try {
            if(this.body.password.length < 0) {
                throw new Error("Harap Masukan Password");
            }
            const password = await this.repository.global.service.UserService.hashPassword(
                this.body.password
            );
            const data = {
                username: this.body.username || "",
                password: password,
                nik: this.body.nik || "-",
                no_kk: this.body.no_kk || "-",
                nama_user: this.body.nama_user || "",
                level: this.body.level || "",
                img_url: "-",
            };
            const result = await this.repository.User.insertUser(data);
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }
}