// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import WayfindingPage from './pages/WayfindingPage'; // Import when you create it

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/wayfinding" element={<WayfindingPage />} /> */}
                    {/* Add more routes for other pages */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;