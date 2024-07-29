import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodos } from "./todo.service";
import IApiResponse from "@/types/api.type";
import ITodo from "@/types/todo.type";

export const fetchTodosThunk = createAsyncThunk<IApiResponse<ITodo[]>, string>('fetch/todos', async (userId: string, thunkApi) => {
    try {
        const todos = await fetchTodos(userId);
        if(!todos) throw new Error('there is no Todos to be fetched');
        return todos;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});