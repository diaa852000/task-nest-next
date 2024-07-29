import ISliceState from "@/types/slice.type";
import ITodo from "@/types/todo.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodosThunk } from "./todo.thunk";
import IApiResponse from "@/types/api.type";

const initialState: ISliceState<ITodo[]> = {
    isLoading: true,
    hasError: null,
    data: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodosThunk.pending, (state) => {
            state.isLoading = true;
            state.hasError = null;
        })
        .addCase(fetchTodosThunk.fulfilled, (state, action: PayloadAction<IApiResponse<ITodo[]>>) => {
            state.isLoading = false;
            state.hasError = null;
            state.data = action.payload.data;
        })
        .addCase(fetchTodosThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = action.error.message || 'Something went wrong';
        })
    }
})

export default todoSlice.reducer;