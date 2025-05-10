import React, { useState, useEffect } from 'react'; // Import useEffect
import './SignUp.css';
import '../HeroSection.css';
import Google from '@mui/icons-material/Google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('VISITOR'); // Default role
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // State for loading
  const [isRedirecting, setIsRedirecting] = useState(false); // New state for redirection
  const [redirectTimer, setRedirectTimer] = useState(5); // Initial timer value
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setRole('VISITOR'); // Reset to default role
  };

  useEffect(() => {
    if (isRedirecting && redirectTimer > 0) {
      const timer = setTimeout(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearTimeout(timer); // Cleanup the timer
    } else if (isRedirecting && redirectTimer === 0) {
      navigate('/sign-in');
    }
  }, [isRedirecting, redirectTimer, useNavigate()]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      setSignupError('');
      return;
    }
    setPasswordMatchError('');
    setIsSigningUp(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8080/users/register', { // Backend URL
        username,
        email,
        password,
        firstName: firstName,
        lastName: lastName,
        role,
      });
      console.log('Signup successful:', response.data);
      setSignupError('');
      resetForm(); // Clear the form fields after successful signup
      setIsRedirecting(true); // Start redirection sequence
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response && error.response.status === 409) {
        setSignupError(error.response.data);
      } else {
        setSignupError('Signup failed. Please try again later.');
      }
    } finally {
      setIsSigningUp(false); // End loading (whether success or failure)
    }
  };

  const handleGoogleSignIn = () => {
    // ... Google Sign-In logic
  };

  return (
      <div className='hero-container'>
        <video src='/videos/cit-drone.mp4' autoPlay loop muted />
        <div className="signup-container">
          <h2>Sign Up</h2>
          {signupError && <div className="alert alert-danger">{signupError}</div>}
          {isRedirecting ? (
              <div className="redirect-message">
                Signup successful! Redirecting to Sign In in {redirectTimer} seconds...
              </div>
          ) : (
              <form onSubmit={handleSubmit} className="signup-form-grid">
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address:</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                  />
                  {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="role">Account Type:</label>
                  <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="VISITOR">Visitor</option>
                    <option value="CATS">Faculty</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <button type="submit" className="signup-button" disabled={isSigningUp || isRedirecting}>
                  {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>
          )}

          <button onClick={handleGoogleSignIn} className="google-signin-button" disabled={isRedirecting}>
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