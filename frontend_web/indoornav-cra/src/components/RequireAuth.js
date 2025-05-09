import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            console.log('RequireAuth: No JWT found, redirecting to /sign-in');
            navigate('/sign-in', { replace: true }); // Use replace to prevent going back
        }
    }, [navigate]); // Re-run effect if navigate function changes

    return <Outlet />;
};

export default RequireAuth;