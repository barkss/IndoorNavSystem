import React, { useState } from 'react';
import './SignIn.css';
import '../HeroSection.css';
import Google from '@mui/icons-material/Google';
import { SvgIcon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import

function SignIn() {
    console.log('SignIn component rendered');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                email: email,  // Changed from username to email
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            localStorage.setItem('jwtToken', response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Signin failed:', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Incorrect email or password.');
            } else {
                setErrorMessage('Signin failed. Please try again later.');
            }
        }
    };

    const handleGoogleSignIn = () => {
        console.log('Google Sign In clicked!');
    };

    return (
        <div className='hero-container'>
            {/*<video src='/videos/cit-drone.mp4' autoPlay loop muted />*/}
            <div className="signin-container">
                <h2>Sign In</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                <button onClick={handleGoogleSignIn} className="google-signin-button">
                    <Google /> Sign in with Google
                </button>
                <p className="signup-link">
                    Don't have an account? <a href="/sign-up">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default SignIn;