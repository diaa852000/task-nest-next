'use client';

import ITodo from "@/types/todo.type";
import { useDispatch } from "react-redux";
import { AppDispatch} from "@/lib/redux/store/store";
import { deleteTodoThunk } from "@/lib/redux/features/todo/todo.thunk";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import useTruncate from "@/hooks/useTruncate";


export default function Todo(props: ITodo) {
    const { title, description, dueDate, isCompleted, categories, _id } = props;
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteTodo = (id: string) => {
        console.log(id)
        if (id) return dispatch(deleteTodoThunk(id));
    }

    return (
        <div className="lg:max-w-[450px] xl:max-w-[400px] w-full shadow lg:h-[250px] p-2 flex flex-col bg-white">
            <div className="flex-grow">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                            <Link className="text-gray-700 font-medium" href={`dashboard/${_id}`}>{title}</Link>
                        <button type="button" onClick={() => handleDeleteTodo(_id)}>
                            <MdOutlineCancel />
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm py-2 text-pretty">{useTruncate(description, 320)}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 justify-start">
                    {categories?.map((category, index) => (
                        <p
                            key={index}
                            className={`text-xs font-medium ${index % 2 === 0 ? 'text-indigo-500' : 'text-lime-500'} capitalize`}
                        >
                            #{category}
                        </p>
                    ))}
                </div>
                <p className="text-gray-500 text-[10px]">{dueDate}</p>
            </div>
        </div>
    )
}