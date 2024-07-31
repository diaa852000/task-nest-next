'use client';

import { handleSelectedCategories } from "@/lib/redux/features/todo/todo.slice";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import { Options } from "@/types/select.type";
import dynamic from "next/dynamic";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Todos = dynamic(() => import('./TodoList'), { ssr: false })
const categories: Options[] = [
    { value: "personal", label: "personal" },
    { value: "work", label: "work" },
    { value: "shopping", label: "shopping" },
    { value: "sports", label: "sports" },
];

export function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newSelectedCategory = e.target.value;
        dispatch(handleSelectedCategories(newSelectedCategory));
    }

    return (
        <div className="flex flex-col gap-4">
            <ul className="flex items-center justify-center gap-4 p-4 max-w-[600px] mx-auto shadow">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-1"
                    >
                        <label htmlFor={category.label} className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value={category.value}
                                onChange={handleChange}
                                id={category.label}
                                className="hidden peer"
                            />
                            <span className="bg-gray-100 rounded p-1 shadow text-sm uppercase font-medium peer-checked:bg-indigo-500 relative
                            peer-checked:text-white peer-checked:shadow-lg transition-all peer-checked:rotate-6 block">
                                {category.label}
                            </span>
                        </label>

                    </li>
                ))}
            </ul>
            <Suspense fallback={<div>Loading...</div>}>
                <Todos />
            </Suspense>
        </div>
    );
}


export default Dashboard;
