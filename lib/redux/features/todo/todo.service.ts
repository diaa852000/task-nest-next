import api from "@/lib/axios/api";
import IApiResponse from "@/types/api.type";
import ITodo from "@/types/todo.type";


export const fetchTodos = async (userId: string): Promise<IApiResponse<ITodo[]>> => {
    try {
        const response = await api.get<Promise<IApiResponse<ITodo[]>>>(`todos?userId=${userId}`);
        if (!response) throw new Error('There is an Error while fetching todos');
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const getTodo = async (todoId: string): Promise<IApiResponse<ITodo>> => {
    try {
        if(!todoId) throw new Error('_id maybe is null or undefined')
        const response = await api.get<Promise<IApiResponse<ITodo>>>(`todos/${todoId}`);
        if(!response) throw new Error(`There is an Error while fetch the todo wiht ID: ${todoId}`);
        return response.data;
    } catch (error: any) {
        throw error
    }
}

export const deleteTodo = async (todoId: string): Promise<IApiResponse<ITodo>> => {
    try {
        if(!todoId) throw new Error('_id maybe is null or undefined')
        const response = await api.delete<Promise<IApiResponse<ITodo>>>(`todos/${todoId}`);
        if(!response) throw new Error(`There is an Error while deleting the todo wiht ID: ${todoId}`);
        return response.data;
    } catch (error: any) {
        throw error
    }
}

export const updateTodo = async (todoId: string, data: ITodo): Promise<IApiResponse<ITodo>> => {
    try {
        if(!todoId) throw new Error('_id maybe is null or undefined')
        const response = await api.patch<Promise<IApiResponse<ITodo>>>(`todos/${todoId}`, data);
        if(!response) throw new Error(`There is an Error while updating the todo wiht ID: ${todoId}`);
        return response.data;
    } catch (error: any) {
        throw error
    }
}


