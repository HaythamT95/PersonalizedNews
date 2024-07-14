
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import './authentication.css'

const Authentication = () => {
    const router = useRouter(); 

    const [active, setActive] = useState(false);
    const [signUpData, setSignUpData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [signUpErrors, setSignUpErrors] = useState({ firstName: false, lastName: false, email: false, password: false });
    const [signInErrors, setSignInErrors] = useState({ email: false, password: false });
    const [loginError, setLoginError] = useState()

    const handleToggle = () => {
        setActive(!active);
        setSignUpErrors({ firstName: false, lastName: false, email: false, password: false });
        setSignInErrors({ email: false, password: false });
    };

    const validateSignUp = () => {
        const errors = {
            firstName: !signUpData.firstName,
            lastName: !signUpData.lastName,
            email: !signUpData.email,
            password: !signUpData.password,
        };
        setSignUpErrors(errors);
        setTimeout(() => setSignUpErrors(''), 5000);
        return !Object.values(errors).includes(true);
    };

    const validateSignIn = () => {
        const errors = {
            email: !signInData.email,
            password: !signInData.password,
        };
        setSignInErrors(errors);
        setTimeout(() => setSignInErrors(''), 5000);
        return !Object.values(errors).includes(true);
    };

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInData({ ...signInData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (validateSignUp()) {
            console.log('Sign Up Data:', signUpData);

            const response = await fetch('http://localhost:5556/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData)
            });
            console.log(response)

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userData', JSON.stringify(data.user))
                router.push('/homepage');
            } else if (response.status === 409) {
                setLoginError('Email already exists');
                setTimeout(() => setLoginError(''), 5000);
            } else {
                setLoginError('Server error');
                setTimeout(() => setLoginError(''), 5000);
            }
        }

    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (validateSignIn()) {

            const response = await fetch('http://localhost:5556/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signInData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userData', JSON.stringify(data.user))
                console.log(data.user)
                router.push('/homepage');
            } else if (response.status === 404 || response.status === 401) {
                setLoginError('Wrong email or password');
                setTimeout(() => setLoginError(''), 5000);
            } else {
                setLoginError('Server error');
                setTimeout(() => setLoginError(''), 5000);
            }
        }
    };

    return (
        <div>

            <div className={`container ${active ? 'active' : ''} `} id="container">
                <div className={`form-container sign-up `}>
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={signUpData.firstName}
                            onChange={handleSignUpChange}
                            className={`${signUpErrors.firstName || signUpErrors.lastName || signUpErrors.email || signUpErrors.password ? 'error' : ''}`}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={signUpData.lastName}
                            onChange={handleSignUpChange}
                            className={`${signUpErrors.firstName || signUpErrors.lastName || signUpErrors.email || signUpErrors.password ? 'error' : ''}`}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={handleSignUpChange}
                            className={`${signUpErrors.firstName || signUpErrors.lastName || signUpErrors.email || signUpErrors.password ? 'error' : ''}`}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                            className={`${signUpErrors.firstName || signUpErrors.lastName || signUpErrors.email || signUpErrors.password ? 'error' : ''}`}
                        />
                        {(signUpErrors.firstName || signUpErrors.lastName || signUpErrors.email || signUpErrors.password) && <p className="error-message">Please fill all fields</p>}
                        {loginError !=='' && <p className="error-message">{loginError}</p>}
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={handleSignInChange}
                            className={`${signInErrors.email || signInErrors.password ? 'error' : ''}`}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signInData.password}
                            onChange={handleSignInChange}
                            className={`${signInErrors.email || signInErrors.password ? 'error' : ''}`}
                        />
                        {(signInErrors.email || signInErrors.password) && <p className="error-message">Please fill all fields</p>}
                        {loginError !=='' && <p className="error-message">{loginError}</p>}
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to recieve latest news based on your preferences</p>
                            <button className="hidden" id="login" onClick={handleToggle}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details and recieve latest news based on your preferences</p>
                            <button className="hidden" id="register" onClick={handleToggle}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;