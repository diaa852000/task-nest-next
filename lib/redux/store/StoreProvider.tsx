'use client';

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from './store'

interface StoreProps {
    children: ReactNode
}

export default function StoreProvider({children}: StoreProps){
    return <Provider store={store}>{children}</Provider>
}