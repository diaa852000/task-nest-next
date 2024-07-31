'use client'

import useUpdate from "@/hooks/useUpdate";
import ITodo from "@/types/todo.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SingleTodo({ params }) {
    const id = params?.todoId;
    const router = useRouter();
    const {
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
    } = useUpdate(id);

    const data: ITodo = {
        _id: singleTodo?._id || "",
        title,
        description,
        dueDate,
        isCompleted,
        categories
    }

    const handleCancel = () => router.push('/dashboard')

    if(isLoading) return <p>loading...</p>

    return (
        <div className="max-w-[800px] mx-auto p-4 ">
            <form
                onSubmit={() => handleUpdateTodo(data)}
                className="w-full flex flex-col gap-4"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="uppercase text-sm font-semibold">title</label>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-gray-200 rounded-lg p-2 outline-0 focus:shadow-sm font-medium text-gray-600 font-sans"
                        id="title"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="uppercase text-sm font-semibold">description</label>
                    <textarea
                        rows={8}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-gray-200 rounded-lg p-2 outline-0 focus:shadow-sm font-medium text-gray-600 font-sans "
                        id="description"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="due-date" className="uppercase text-sm font-semibold">due Date</label>
                    <input
                        type="text"
                        placeholder="Due date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border-gray-200 rounded-lg p-2 outline-0 focus:shadow-sm font-medium text-gray-600 font-sans"
                        id="due-date"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="category" className="uppercase text-sm font-semibold">categories</label>
                        <select
                            value={categories}
                            name="category"
                            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border"
                            id="category"
                        >
                            {categories?.map((category, index) => (
                                <option 
                                    key={index} 
                                    value={category}
                                    className="p-2"
                                >
                                    {category}
                                </option>
                            ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="isCompleted" className="uppercase text-sm font-semibold">completed</label>
                        <select
                            value={isCompleted}
                            name="isCompleted"
                            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border"
                            id="isCompleted"
                            onChange={(e) => setIsComplete(e.target.value)}
                        >
                            <option value={'no'}>No</option>
                            <option value={'yes'}>Yes</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="submit"
                        className="uppercase text-sm rounded p-2 bg-indigo-500 text-white font-medium shadow"
                    >
                        update
                    </button>
                    <button
                        type="button"
                        className="uppercase text-sm rounded p-2 text-indigo-500 font-medium border order-1"
                        onClick={handleCancel}
                    >
                        cancle
                    </button>
                </div>
            </form>
        </div>
    )
}

