import { API } from '../../../app.config'
import { LoginUserDto, CreateUserDto } from '../../../data/dto/UserDto'
import axios from 'axios';
import { User } from '../../../data/models/User';

export const signup = async (user: CreateUserDto) => {
    try {
        const res = await axios.post(`${API}/signup`, user);
        return res;
    } catch (error) {
        console.log(`auth.helper/signup/ ${JSON.stringify(error)}`);
        return
    }
}

export const signin = async (user: LoginUserDto) => {
    try {
        const res = await axios.post(`${API}/signin`, user);
        return res;
    } catch (error: any) {
        console.log(`auth.helper/signup/ ${JSON.stringify(error)}`);
        return
    }
}


export const signout = async (next: () => void) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
    }
    next()
    try {
        return await axios.get(`${API}/signout`)
    } catch (error: any) {
        console.log(`auth.helper/signup/ ${JSON.stringify(error)}`);
        return
    }
}

export const authenticate = (data: any, next: () => void) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
    }
    next()
}

export function isAuthenticated(): User | null {
    if (typeof window == 'undefined') {
        return null;
    }
    const token = localStorage.getItem('jwt')
    if (token !== null) {
        return JSON.parse(token).user as User
    } else {
        return null;
    }
}

export function getToken(): string {
    if (typeof window == 'undefined') {
        return "";
    }
    const token = localStorage.getItem('jwt')
    if (token !== null) {
        return JSON.parse(token).token as string
    } else {
        return "";
    }
}