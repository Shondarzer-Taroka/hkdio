import { Schema } from "mongoose";
import { IUser } from "../types/User";

const userSchemaModel = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true })