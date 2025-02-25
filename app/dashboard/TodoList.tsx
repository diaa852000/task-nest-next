'use client';

import Todo from "@/app/dashboard/Todo";
import { fetchTodosThunk } from "@/lib/redux/features/todo/todo.thunk";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TodoList() {
    const { selectedCategories, data: todos } = useSelector((state: RootState) => state.todo);
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (auth.data?.id) {
            dispatch(fetchTodosThunk(auth.data?.id))
        }
    }, [dispatch, auth.data?.id])

    const filteredTodos = selectedCategories.length > 0
        ? todos && todos.filter(todo => todo.categories && todo?.categories.some(category => selectedCategories.includes(category)))
        : todos;

    return (
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center lg:justify-center xl:justify-start gap-4 w-full md:px-6 2xl:px-20 py-4">
            {filteredTodos?.map((todo, index) => (
                <Todo
                    key={index}
                    _id={todo._id}
                    title={todo.title}
                    description={todo.description}
                    dueDate={todo.dueDate}
                    categories={todo.categories}
                    isCompleted={todo.isCompleted}
                />
            ))}
        </div>
    )
}