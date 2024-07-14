'use client'

import Preferences from './preferences.js';
import { useRouter } from 'next/navigation';
import SendMail from './sendMail.js';
import './homepage.css'


const HomePage = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('userData');

        router.push('/authentication');
    };

    return (
        <div className='home-page'>
            <SendMail/>
            <button className='logout-btn' onClick={handleLogout}>Logout <i className="fa fa-sign-out-alt"/></button>
            <Preferences />
        </div>
    )
}

export default HomePage;