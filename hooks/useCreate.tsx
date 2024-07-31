import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import ITodo from "@/types/todo.type";
import { MultiValue, SingleValue } from "react-select";
import { Options } from "@/types/select.type";
import dayjs from "dayjs";
import { createTodoThunk } from "@/lib/redux/features/todo/todo.thunk";

export default function useCreate() {
    const { isLoading, hasError } = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState<string | null>("not completed")

    useEffect(() => {
        if(!dueDate) {
            setDueDate(new Date().toISOString().split('T')[0])
        }
    },[dueDate])


    const handleCategoriesChange = (selectedOptions: MultiValue<Options> | null) => {
        const selectedValues = (selectedOptions || []).map(option => option.value);
        setCategories(selectedValues);
    };
    const handleIsCompletedChange = (selectedOption: SingleValue<Options> | null) => {
        setIsCompleted(selectedOption ? selectedOption.value : null);
    };

    const handleCreateTodo = async (data: ITodo) => {
        try {
            const response = await dispatch(createTodoThunk(data));
            return response;
        } catch (error) {
            console.log(error)
        }
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
        setIsCompleted,
        isLoading,
        handleCategoriesChange,
        handleIsCompletedChange,
        handleCreateTodo
    };
}
