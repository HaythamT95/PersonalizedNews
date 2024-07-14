'use client'
// import './homepage.css'
import Preferences from './preferences.js';
import { useRouter } from 'next/navigation';
import SendMail from './sendmail.js';


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