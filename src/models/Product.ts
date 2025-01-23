import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/Product";



const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, { timestamps: true })


export default mongoose.model<IProduct>("Products", productSchema)