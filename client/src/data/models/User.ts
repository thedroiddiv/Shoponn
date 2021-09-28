export interface User {
    _id:string
    firstName:string;
    lastName:string;
    email:string;
    role:number;
    purchases?:any[]
}