export interface Product  {
    name: string,
    description: string,
    price: number,
    featureImage: string,
    images: string[]
}

export interface CartProduct {
    name: string,
    description: string,
    price: number,
    featureImage: string,
    images: string[],
    quantity:number
}