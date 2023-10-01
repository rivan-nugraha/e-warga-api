import { User } from "../../../entities/masters/UserEntity/User";
import RepositoryBase from "../../../repositories/base/RepositoryBase";

export default class UserRepositories extends RepositoryBase{
    private User: any;
    constructor(db: any, jf: any, service: any) {
        const sendColumn = {

        }
        super(db, jf, service, sendColumn);
        this.User = new User;
    }

    async insertUser(data: any) {
        const User = new this.User(data);
        await User.save();
        return `User Added`;
      }
    
    async getUser(username: string) {
        const result = await this.User.findOne({ username: username }).lean();
        return result;
    }
}