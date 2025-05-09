import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        // Check if the JWT token exists in local storage (or wherever you store it)
        const jwtToken = localStorage.getItem('jwtToken');

        if (jwtToken) {
            // Optionally, you might want to quickly check if the token is not expired
            // on the frontend, but the backend should be the source of truth.
            // For a simple check: if it exists, assume it's valid enough for frontend routing.
            navigate('/point-to-point'); // Redirect to the map page if JWT exists
        } else {
            navigate('/sign-in'); // Redirect to the login page if JWT doesn't exist
        }
    };

    const handleWatchTrailerClick = () => {
        navigate('/campus'); // Adjust authentication check if needed for trailer
    };

    return (
        <div className='hero-container'>
            <video src='/videos/cit-drone.mp4' autoPlay loop muted />
            <h1>NAWA KA?</h1>
            <p>What are you waiting for?</p>
            <div className='hero-btns'>
                <Button
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'
                    onClick={handleGetStartedClick}
                >
                    GET STARTED
                </Button>
                <Button
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                    onClick={handleWatchTrailerClick}
                >
                    WATCH TRAILER <i className='far fa-play-circle' />
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;