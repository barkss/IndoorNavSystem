import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import BaseCampusMap from './components/BaseCampusMap';
import CampusNavigationPage from './components/pages/CampusNavigationPage';
import NavigationDrawPage from './components/pages/NavigationDrawPage';
import BlueDotPage from './components/pages/BlueDotPage';
import PointToPointPath from './components/pages/PointToPointPath';
import RequireAuth from './components/RequireAuth'; // Import the RequireAuth component
import ProfilePage from './components/pages/ProfilePage';
import UserManagerPage from "./components/pages/UserManagerPage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/campus" element={<BaseCampusMap />} />

                {/* Protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile-manager" element={<UserManagerPage />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/navigate" element={<CampusNavigationPage />} />
                    <Route path="/draw-navigation" element={<NavigationDrawPage />} />
                    <Route path="/blue-dot" element={<BlueDotPage />} />
                    <Route path="/point-to-point" element={<PointToPointPath />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;