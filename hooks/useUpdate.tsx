import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOneTodoThunk, updateTodoThunk } from "@/lib/redux/features/todo/todo.thunk";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import ITodo from "@/types/todo.type";
import { MultiValue, SingleValue } from "react-select";
import { Options } from "@/types/select.type";

export default function useUpdate(id: string) {
    const { singleTodo, isLoading } = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState(singleTodo?.title || "");
    const [description, setDescription] = useState(singleTodo?.description || "");
    const [dueDate, setDueDate] = useState(singleTodo?.dueDate || "");
    const [categories, setCategories] = useState(singleTodo?.categories || []);
    const [isCompleted, setIsCompleted] = useState<string | null>(singleTodo?.isCompleted || "not completed")

    useEffect(() => {
        dispatch(findOneTodoThunk(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (singleTodo) {
            setTitle(singleTodo.title || "");
            setDescription(singleTodo.description || "");
            setDueDate(singleTodo.dueDate || "");
            setCategories(singleTodo.categories || []);
            setIsCompleted(singleTodo.isCompleted || "not compeleted");
        }
    }, [singleTodo, id]);

    const handleCategoriesChange = (selectedOptions: MultiValue<Options> | null) => {
        const selectedValues = (selectedOptions || []).map(option => option.value);
        setCategories(selectedValues);
    };
    const handleIsCompletedChange = (selectedOption: SingleValue<Options> | null) => {
        setIsCompleted(selectedOption ? selectedOption.value : null);
    };

    const handleUpdateTodo = async (data: ITodo) => {
        try {
            const response = await dispatch(updateTodoThunk(data));
            return response.payload;
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

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
        setIsCompleted,
        singleTodo,
        isLoading,
        handleUpdateTodo,
        handleCategoriesChange,
        handleIsCompletedChange
    };
}
