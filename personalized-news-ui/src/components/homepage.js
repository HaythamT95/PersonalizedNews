import styles from '../styles/homepage.module.css'
import Preferences from './preferences.js';
import { useNavigate } from "react-router-dom";
import SendMail from './sendmail.js';


const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userData');

        navigate('/');
    };

    return (
        <div className={styles.homepage}>
            <SendMail/>
            <Preferences />
            <button className={styles.logoutbtn} onClick={handleLogout}>Logout <i className="fa fa-sign-out-alt"/></button>
        </div>
    )
}

export default HomePage;