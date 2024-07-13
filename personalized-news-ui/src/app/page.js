'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

const Initial = () => {
    const router = useRouter(); 

    useEffect(() => {
        const value = localStorage.getItem('userData');

        if (value) {
            router.push('/homepage');
        } else {
            setCookie('logged', 'false')
            router.push('/authentication');
        }
    }, [router]);

    return (
        null
    );
};

export default Initial;
