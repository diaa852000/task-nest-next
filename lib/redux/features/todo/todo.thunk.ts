import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTodo, fetchTodos, getTodo, updateTodo } from "./todo.service";
import IApiResponse from "@/types/api.type";
import ITodo from "@/types/todo.type";
// interface UpdateTodoArgs {
//     todoId: string;
//     data: ITodo;
// }

export const fetchTodosThunk = createAsyncThunk<IApiResponse<ITodo[]>, string>('fetch/todos', async (userId: string, thunkApi) => {
    try {
        const todos = await fetchTodos(userId);
        if (!todos) throw new Error('there is no Todos to be fetched');
        return todos;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const findOneTodoThunk = createAsyncThunk<IApiResponse<ITodo>, string>('findOne/todo', async (todoId: string, thunkApi) => {
    try {
        const response = await getTodo(todoId);
        if (!response) throw new Error('Can not fetch the todo with this id');
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});


export const deleteTodoThunk = createAsyncThunk<IApiResponse<ITodo>, string>('delete/todo', async (todoId: string, thunkApi) => {
    try {
        const response = await deleteTodo(todoId);
        if (!response) throw new Error('Can not delete the todo with this id');
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const updateTodoThunk = createAsyncThunk<IApiResponse<ITodo>, ITodo>('patch/todo', async (data, thunkApi) => {
        try {
            const response = await updateTodo(data._id, data);
            if (!response) throw new Error('Cannot update the todo with this id');
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message || 'An error occurred');
        }
    }
);
