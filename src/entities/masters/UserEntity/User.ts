import { Schema, model } from "mongoose";

export class User {
  constructor() {
    const UserSchema = new Schema({
      username: { type: String, require: true, unique: true },
      nama_user: { type: String, require: true },
      password: { type: String, require: true },
      level: { type: String, default: "WRG" },
      img_url: { type: String, default: "-" },
    });

    UserSchema.index({ username: 1 }, { unique: true });
    const User = model("tm_user", UserSchema, "tm_user");

    return User;
  }
}
