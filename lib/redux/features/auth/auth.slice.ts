import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk, signUpThunk } from "./auth.thunk";
import ISliceState from "@/types/slice.type";
import IAuth from "@/types/auth.type";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const token = Cookies.get('token');

const decodeToken = (token: string | undefined): IAuth | null => {
    if (!token) return null;
    try {
        return jwtDecode<IAuth>(token);
    } catch (e) {
        console.error('Invalid token:', e);
        return null;
    }
}

const initialState: ISliceState<IAuth> = {
    isLoading: true,
    hasError: null,
    data: decodeToken(token)
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<{token: string}>) => {
                state.isLoading = false;
                state.hasError = null;
                const decodedToken = decodeToken(action.payload?.token);
                state.data = decodedToken;
                Cookies.set('token', action.payload?.token, { expires: 3 });
                localStorage.setItem('user', JSON.stringify(jwtDecode(action.payload?.token)))
            })
            .addCase(loginThunk.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.hasError = action.payload || 'Something went wrong';
            })

            // SIGNUP
            .addCase(signUpThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(signUpThunk.fulfilled, (state, action: PayloadAction<{token: string}>) => {
                state.isLoading = false;
                state.hasError = null;
                const decodedToken = decodeToken(action.payload?.token);
                state.data = decodedToken;
                Cookies.set('token', action.payload?.token, { expires: 3 });
                localStorage.setItem('user', JSON.stringify(jwtDecode(action.payload?.token)))
            })
            .addCase(signUpThunk.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.hasError = action.payload || 'Something went wrong';
            })
    }
})

export default authSlice.reducer;