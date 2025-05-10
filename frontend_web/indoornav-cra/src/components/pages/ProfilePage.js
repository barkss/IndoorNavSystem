import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import '../HeroSection.css';

function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedFirstName, setUpdatedFirstName] = useState('');
    const [updatedLastName, setUpdatedLastName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                navigate('/sign-in');
                return;
            }

            try {
                const response = await fetch('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.removeItem('jwtToken');
                        navigate('/sign-in');
                        return;
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch profile');
                }

                const data = await response.json();
                setUserData(data);
                setUpdatedFirstName(data.firstName || '');
                setUpdatedLastName(data.lastName || '');
                setUpdatedEmail(data.email || '');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setUpdatedFirstName(userData?.firstName || '');
        setUpdatedLastName(userData?.lastName || '');
        setUpdatedEmail(userData?.email || '');
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/sign-in');
            return;
        }

        try {
            const response = await fetch('/api/users/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: updatedFirstName,
                    lastName: updatedLastName,
                    email: updatedEmail,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const updatedData = await response.json();
            setUserData(updatedData);
            setEditMode(false);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className='hero-container'>
                {/*<video src='/videos/cit-drone.mp4' autoPlay loop muted />*/}
                <div className="signup-container">
                    <h2>Loading Profile...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='hero-container'>
                {/*<video src='/videos/cit-drone.mp4' autoPlay loop muted />*/}
                <div className="signup-container">
                    <h2>Error Loading Profile</h2>
                    <div className="alert alert-danger">{error}</div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className='hero-container'>
                {/*<video src='/videos/cit-drone.mp4' autoPlay loop muted />*/}
                <div className="signup-container">
                    <h2>No Profile Data</h2>
                    <p>No profile information available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='hero-container'>
            {/*<video src='/videos/cit-drone.mp4' autoPlay loop muted />*/}
            <div className="signup-container profile-info-container">
                <h2>Your Profile</h2>
                {editMode ? (
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={updatedFirstName}
                                onChange={(e) => setUpdatedFirstName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={updatedLastName}
                                onChange={(e) => setUpdatedLastName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={updatedEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                            />
                        </div>
                        <button className="edit-button" onClick={handleSaveClick}>Save</button>
                        <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label>Username:</label>
                            <p>{userData.username}</p>
                        </div>
                        <div className="form-group">
                            <label>First Name:</label>
                            <p>{userData.firstName}</p>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <p>{userData.lastName}</p>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <p>{userData.email}</p>
                        </div>
                        <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
