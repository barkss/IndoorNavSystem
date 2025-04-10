import React, { useState } from 'react';
import './SignIn.css'; // Create this CSS file
import '../HeroSection.css';
import Google from '@mui/icons-material/Google';
import { SvgIcon } from '@mui/material';


function SignIn() {
    console.log('SignIn component rendered'); // Add the console.log here

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Sign In submitted:', { email, password });
        // Replace with your sign-in logic
        setEmail('');
        setPassword('');
    };

    const handleGoogleSignIn = () => {
        // Replace with your Google authentication logic
        console.log('Google Sign In clicked!');
        // You would typically redirect the user to your Google authentication endpoint here
    };

    return (
        <div className='hero-container'>
            <video src='/videos/cit-drone.mp4' autoPlay loop muted />
            <div className="signin-container">
                <h2>Sign In</h2>
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