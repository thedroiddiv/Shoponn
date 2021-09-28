export interface Product {
    _id: string
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

export interface CartProduct {
    _id: string
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    quantity: number
}