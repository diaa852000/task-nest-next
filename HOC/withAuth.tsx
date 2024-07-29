'use client'

import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const WithAuth = (WrappedComponent: React.FC) => {
    function Wrapper(props: any){
        const router = useRouter();
        const token = Cookies.get('token');

        useEffect(() => {
            if (!token) {
                router.push('/');
            }
        }, [token, router]);

        if (!token) {
            return null; 
        }

        return <WrappedComponent {...props} />;
    };
    return Wrapper;
};

export default WithAuth;
