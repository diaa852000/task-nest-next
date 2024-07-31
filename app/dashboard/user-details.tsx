'use client';

import { logout } from '@/lib/redux/features/auth/auth.slice';
import { AppDispatch, RootState } from '@/lib/redux/store/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function UserDetails() {
    const auth = useSelector((state: RootState) => state.auth);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => setIsOpen(prev => !prev)

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = () => {
        try {
            dispatch(logout())
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative'>
            <button
                onClick={toggleMenu}
                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400
                    dark:hover:text-neutral-500 dark:focus:text-neutral-500"
            >
                {auth.data && auth.data?.name}
            </button>
            <ul className={`p-1 z-30 w-[140px] bg-white rounded border shadow-md divide-y ${isOpen ? 'flex flex-col absolute top-8 right-0' : 'hidden'} `}>
                <li className='w-full text-sm p-2 text-center text-gray-500'>
                    {auth.data && auth?.data?.name}
                </li>
                <li className='w-full text-sm p-2 text-center text-gray-500'>
                    {auth.data && auth?.data?.email}
                </li>
                <li className='w-full p-1'>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="font-medium focus:outline-none focus:text-gray-400 rounded-md py-2 px-4
                        text-indigo-500 capitalize w-full"
                    >
                        logout
                    </button>
                </li>
            </ul>
        </div>
    )
}
