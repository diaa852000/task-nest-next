import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOneTodoThunk, updateTodoThunk } from "@/lib/redux/features/todo/todo.thunk";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import ITodo from "@/types/todo.type";

export default function useUpdate(id: string) {
    const { singleTodo, isLoading } = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState(singleTodo?.title || "");
    const [description, setDescription] = useState(singleTodo?.description || "");
    const [dueDate, setDueDate] = useState(singleTodo?.dueDate || "");
    const [categories, setCategories] = useState(singleTodo?.categories || []);
    const [isCompleted, setIsComplete] = useState(singleTodo?.isCompleted || "no");

    useEffect(() => {
        dispatch(findOneTodoThunk(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (singleTodo) {
            setTitle(singleTodo.title || "");
            setDescription(singleTodo.description || "");
            setDueDate(singleTodo.dueDate || "");
            setCategories(singleTodo.categories || []);
            setIsComplete(singleTodo?.isCompleted);
        }
    }, [singleTodo, id]);

    const handleUpdateTodo = (data: ITodo) => {
        dispatch(updateTodoThunk(data))
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        dueDate,
        setDueDate,
        categories,
        setCategories,
        isCompleted,
        setIsComplete,
        singleTodo,
        isLoading,
        handleUpdateTodo
    };
}
