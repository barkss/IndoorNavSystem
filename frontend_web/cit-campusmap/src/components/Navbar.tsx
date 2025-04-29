// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // If you plan to use React Router

function Navbar() {
    return (
        <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
            {/* Add more navigation links here */}
            {/* Example: <Link to="/wayfinding" style={{ textDecoration: 'none', color: 'black' }}>Wayfinding</Link> */}
        </nav>
    );
}

export default Navbar;