import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signUp } from "./auth.service";
import { ILogin, ISignUp } from "@/types/auth.type";

export const loginThunk = createAsyncThunk('auth/login', async (credentials: ILogin, thunkApi) => {
    try {
        const response = await login(credentials);
        if(!response.token) throw new Error('there is no token, email or password maybe wrong!');
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const signUpThunk = createAsyncThunk('auth/signup', async (credentials: ISignUp, thunkApi) => {
    try {
        const response = await signUp(credentials);
        if(!response.token) throw new Error('there is no token, email or password maybe wrong!');
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

