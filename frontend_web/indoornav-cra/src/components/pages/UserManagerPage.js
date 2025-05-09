import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManagerPage.css';
import '../HeroSection.css';

function UserManagerPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                navigate('/sign-in');
                return;
            }

            try {
                const response = await fetch('/api/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        navigate('/'); // Redirect to home or unauthorized page
                        return;
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleDeleteUser = async (id) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/sign-in');
            return;
        }

        try {
            const response = await fetch(`/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to delete user with ID ${id}`);
            }

            // Update the user list after successful deletion
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className='hero-container'>
                <video src='/videos/cit-drone.mp4' autoPlay loop muted />
                <div className="signup-container user-table-container">
                    <h2>Loading Users...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='hero-container'>
                <video src='/videos/cit-drone.mp4' autoPlay loop muted />
                <div className="signup-container user-table-container">
                    <h2>Error Loading Users</h2>
                    <div className="alert alert-danger">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className='hero-container'>
            <video src='/videos/cit-drone.mp4' autoPlay loop muted />
            <div className="signup-container user-table-container">
                <h2>User Manager</h2>
                {users.length > 0 ? (
                    <table className="user-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                    <button className="action-button delete" onClick={() => handleDeleteUser(user.id)}>
                                        Delete
                                    </button>
                                    {/* Add Edit button and functionality later */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}

export default UserManagerPage;