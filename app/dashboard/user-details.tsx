'use client';

import { RootState } from '@/lib/redux/store/store';
import React from 'react'
import { useSelector } from 'react-redux';

export default function UserDetails() {
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <p className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500">
            {auth.data && auth.data?.name}
        </p>
    )
}
