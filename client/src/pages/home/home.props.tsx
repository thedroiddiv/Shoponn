import { Product } from "../../data/models/product";

export interface HomeProps {
    featured: Product[];
    products: Product[];
}