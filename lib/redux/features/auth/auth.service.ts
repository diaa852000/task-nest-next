import api from "@/lib/axios/api";
import { ILogin, ISignUp } from "@/types/auth.type";
import Cookies from "js-cookie";

export const login = async (credentials: ILogin): Promise<{ token: string }> => {
    try {
        const response = await api.post('auth/login', credentials);
        if (!response) throw new Error('There is an Error while login');
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw error;
    }
}

export const signUp = async (credentials: ISignUp): Promise<{token: string}> => {
    try {
        const response = await api.post('auth/signup', credentials);
        if (!response) throw new Error('There is an Error while signup');
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw error;
    }
}

export const logout = (): void => {
    Cookies.remove('token');
};
