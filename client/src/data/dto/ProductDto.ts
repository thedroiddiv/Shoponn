import { ObjectId } from "mongoose";

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    photo: any
}