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