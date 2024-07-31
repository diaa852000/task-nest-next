'use client'

import useUpdate from "@/hooks/useUpdate";
import { Options } from "@/types/select.type";
import ITodo from "@/types/todo.type";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import Select from 'react-select';


export default function SingleTodo({ params }: any) {
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
        setIsCompleted,
        singleTodo,
        isLoading,
        handleUpdateTodo,
        handleIsCompletedChange,
        handleCategoriesChange
    } = useUpdate(id);

    const data: ITodo = {
        _id: singleTodo?._id || "",
        title,
        description,
        dueDate,
        isCompleted: isCompleted || "not compeleted",
        categories
    }

    const categoryOptions : Options[] = [
        {value: "personal", label: "personal"},
        {value: "work", label: "work"},
        {value: "shopping", label: "shopping"},
        {value: "sports", label: "sports"},
    ]

    const isCompleteOptions: Options[] = [
        {value: 'completed', label: 'completed'},
        {value: 'not completed', label: 'not completed'}
    ]

    const handleSubmit =  async (e: FormEvent) => {
        e.preventDefault();
        const res: any = await handleUpdateTodo(data);
        if(res?.success) router.push('/dashboard');
    }

    const handleCancel = () => router.push('/dashboard');

    if(isLoading) return <p>loading...</p>

    return (
        <div className="max-w-[800px] mx-auto p-4 ">
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="uppercase text-sm font-semibold">title</label>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-gray-200 rounded px-2 py-1 outline-0 focus:shadow-sm font-medium text-gray-600 font-sans outline-sky-100"
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
                        className="border-gray-200 rounded p-2 outline-0 focus:shadow-sm font-medium text-gray-600 font-sans "
                        id="description"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="due-date" className="uppercase text-sm font-semibold">due Date</label>
                    <input
                        type="text"
                        placeholder="Due date 'YYYY-MM-DD'"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border-gray-200 rounded py-1 px-2 outline-0 focus:shadow-sm font-medium text-gray-600 font-sans placeholder:text-sm placeholder:font-semibold"
                        id="due-date"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="category" className="uppercase text-sm font-semibold">categories</label>
                        <Select
                                options={categoryOptions}
                                onChange={handleCategoriesChange}
                                value={categoryOptions.filter(option => categories.includes(option.value))}
                                isMulti
                                id="category"
                                name="category"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-[23%]">
                        <label htmlFor="isCompleted" className="uppercase text-sm font-semibold font-sans">completed</label>
                        <Select 
                            options={isCompleteOptions} 
                            name="isCompleted" 
                            id="isCompleted" 
                            value={isCompleteOptions.find(option => option.value === isCompleted) || null}
                            onChange={handleIsCompletedChange}
                        />
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

