import mongoose, { Schema, Document, Model, models } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserBase extends Document {
  email: string;
  password: string;
  userImage: string;
  firstName: string;
  lastName: string;
}

export interface IUser extends IUserBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods{
  getUserByEmail: (email: string) => Promise<IUserDocument>;
  getUserById: (id: string) => Promise<IUserDocument>;
  getAllUsers: () => Promise<IUserDocument[]>;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserDocument extends IUser, IUserMethods {}
interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema<IUserDocument>({
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  userImage: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.getUserByEmail = async function (email: string) {
  return this.findOne({ email });

}

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.getUserById = async function (id: string) {
  return this.findById(id);
}

UserSchema.methods.getAllUsers = async function () {
  return this.find();
}

export const User = (models.User as IUserModel) || mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
