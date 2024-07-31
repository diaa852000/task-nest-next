import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTodo, deleteTodo, fetchTodos, getTodo, updateTodo } from "./todo.service";
import IApiResponse from "@/types/api.type";
import ITodo from "@/types/todo.type";

export const fetchTodosThunk = createAsyncThunk<IApiResponse<ITodo[]>, string>('fetch/todos', async (userId: string, thunkApi) => {
    try {
        const response = await fetchTodos(userId);
        if (!response.success) throw new Error('there is no Todos to be fetched');
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const findOneTodoThunk = createAsyncThunk<IApiResponse<ITodo>, string>('findOne/todo', async (todoId: string, thunkApi) => {
    try {
        const response = await getTodo(todoId);
        if (!response.success) throw new Error('Can not fetch the todo with this id');
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});


export const deleteTodoThunk = createAsyncThunk<IApiResponse<ITodo>, string>('delete/todo', async (todoId: string, thunkApi) => {
    try {
        const response = await deleteTodo(todoId);
        if (!response.success) throw new Error('Can not delete the todo with this id');
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const updateTodoThunk = createAsyncThunk<IApiResponse<ITodo>, ITodo>('patch/todo', async (data: ITodo, thunkApi) => {
        try {
            if(!data._id) throw new Error('there is now todo with this id');
            const response = await updateTodo(data._id, data);
            if (!response.success) throw new Error('Cannot update the todo with this id');
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message || 'An error occurred');
        }
    }
);

export const createTodoThunk = createAsyncThunk<IApiResponse<ITodo>, ITodo>('post/todo', async (data: ITodo, thunkApi) => {
    try {
        const response = await createTodo(data);
        if(!response.success) throw new Error('There is an error occurred while create a Todo');
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message || "An error occurred");
    }
})
