import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User";

const userSchemaModel = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  }, { timestamps: true });

export default mongoose.model<IUser>('User', userSchemaModel)