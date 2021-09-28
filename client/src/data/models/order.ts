import { CartProduct } from "./product";

export interface OrderData {
    products:CartProduct[];
    amount:number;
    transaction_id:any
}