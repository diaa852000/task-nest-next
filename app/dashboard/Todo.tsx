/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import ITodo from "@/types/todo.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store/store";
import { deleteTodoThunk, updateTodoThunk } from "@/lib/redux/features/todo/todo.thunk";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import useTruncate from "@/hooks/useTruncate";
import { ChangeEvent, useState } from "react";


export default function Todo(props: ITodo) {
    const { title, description, dueDate, isCompleted, categories, _id } = props;
    const [updateCompleted, setUpdateCompleted] = useState<string>(isCompleted);
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteTodo = (id: string) => {
        id && dispatch(deleteTodoThunk(id));
    }

    const handleUpdateComplete = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        const newCompletedValue = e.target.value === "completed" ? "not completed" : "completed";
        setUpdateCompleted(newCompletedValue);
        id && dispatch(updateTodoThunk({ ...props, isCompleted: newCompletedValue }))
    }

    return (
        <div className="lg:max-w-[400px] w-full shadow lg:h-[250px] p-2 flex flex-col bg-white">
            <div className="flex-grow">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={updateCompleted === "completed" ? true : false}
                                    value={updateCompleted}
                                    onChange={e => handleUpdateComplete(_id || "", e)}
                                    className="w-4 h-4"
                                />
                                <Link className="text-gray-700 font-medium" href={`dashboard/${_id}`}>{title}</Link>
                            </div>

                            <span className="text-[10px] bg-gray-100 px-1 py-px text-gray-500 uppercase font-medium">{updateCompleted}</span>
                        </div>
                        <div>
                            <button type="button" onClick={() => handleDeleteTodo(_id || "")}>
                                <MdOutlineCancel />
                            </button>
                        </div>
                    </div>
                    {description
                        ? <p className="text-gray-600 text-sm py-2 text-pretty">{useTruncate(description, 320)}</p>
                        : <p className="text-gray-400 text-xs p-2 text-pretty bg-gray-50 w-fit font-semibold rounded shadow-sm my-2 uppercase">add description to be appeared !</p>
                    }
                </div>
            </div>
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2 justify-start">
                    {categories?.map((category, index) => (
                        <span
                            key={index}
                            className={`text-xs font-medium capitalize rounded-full p-1 bg-white/60 border shadow-sm ${index % 2 === 0 ? 'text-indigo-500' : 'text-lime-500'}`}
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <p className="text-gray-500 text-[10px]">{dueDate}</p>
            </div>
        </div>
    )
}