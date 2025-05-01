import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import BaseCampusMap from './components/BaseCampusMap'; // Keep the base map component
import CampusNavigationPage from './components/pages/CampusNavigationPage'; // Import the wayfinding page
import NavigationDrawPage from './components/pages/NavigationDrawPage';
import BlueDotPage from './components/pages/BlueDotPage'; // Import the BlueDotPage component
import { MapProvider } from './MapContext'; // Import the MapProvider (if you have one)

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/campus" element={<BaseCampusMap />} /> {/* Basic map display */}
                <Route path="/navigate" element={<CampusNavigationPage />} /> {/* Wayfinding functionality */}
                <Route path="/draw-navigation" element={<NavigationDrawPage />} /> {/* New route for draw navigation */}
                <Route path="/blue-dot" element={<BlueDotPage />} /> {/* Add the route for BlueDotPage */}
            </Routes>
        </Router>
    );
}

export default App;