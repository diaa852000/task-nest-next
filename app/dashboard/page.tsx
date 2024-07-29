'use client'

import { useEffect, useState } from "react";
import IAuth from "@/types/auth.type";

export function Dashboard() {
    const [user, setUser] = useState<IAuth | undefined>();
    
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if(savedUser) {
            if (savedUser) {
                setUser(JSON.parse(savedUser) as IAuth);
                console.log(user)
            }
        }
    },[])

    return (
        <div>
            <div>Welcome, {user && user.name}</div>
            <div>Email: {user && user.email}</div>
        </div>
    );
}


export default Dashboard;
