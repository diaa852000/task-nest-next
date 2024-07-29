'use client';

import { RootState } from '@/lib/redux/store/store';
import React from 'react'
import { useSelector } from 'react-redux';

export default function UserDetails() {
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <div>
        <div>Welcome, {auth.data && auth.data?.name}</div>
        <div>Email: {auth.data && auth.data?.email}</div>
    </div>
    )
}
