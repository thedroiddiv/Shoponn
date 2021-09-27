export interface CreateUserDto {
    firstName:string;
    lastName:string;
    email:string;
    password:string
    userInfo?:string;
}

export interface LoginUserDto {
    email:string;
    password:string;
}