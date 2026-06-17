import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
    // _id: Types.ObjectId;
    id: number;
    name: string;
    price: number;
    image: string;
    category: [String];
    description: string;
    rating: number;
    featured?: boolean;
}

const productSchema = new Schema<IProduct>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: [String], required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    featured: { type: Boolean, default: false }
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;