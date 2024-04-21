import * as mongoose from "mongoose";

export type IUser = {
  username: string;
  password: string;
  email: string;
};

export type UserM = typeof UserModel;

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  password: String,
  email: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
});

export const UserModel = mongoose.model<IUser>("Users", userSchema);
