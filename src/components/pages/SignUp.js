import React, { useState } from 'react';
import './SignUp.css';
import '../HeroSection.css';
import Google from '@mui/icons-material/Google'; // Import Google icon
import { SvgIcon } from '@mui/material';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { username, email, password });
    setUsername('');
    setEmail('');
    setPassword('');
  };


  const handleGoogleSignIn = () => {
    // Replace with your Google authentication logic
    console.log('Google Sign In clicked!');
    // You would typically redirect the user to your Google authentication endpoint here
  }

  return (
      <div className='hero-container'>
        <video src='/videos/cit-drone.mp4' autoPlay loop muted />
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
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
            <button type="submit">Sign Up</button>
          </form>

          <button onClick={handleGoogleSignIn} className="google-signin-button">
            <Google /> Sign in with Google
          </button>

          <p className="signin-link">
            Already have an Account? <a href="/sign-in">Sign In</a>
          </p>

        </div>
      </div>
  );
}

export default SignUp;