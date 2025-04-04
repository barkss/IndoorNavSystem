import React from 'react';
import { Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import logo from '../assets/logo.png';
import mallImage from '../assets/mall-image.jpg';

const HomePage = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="px-4">
                <Navbar.Brand href="#">
                    <img src={logo} alt="IndoorNav Logo" className="logo" />
                    IndoorNav
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button variant="outline-primary" className="me-2">Login</Button>
                        <Link to="/signup">
                            <Button variant="primary">Signup</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Full-Screen Hero Section */}
            <div className="homepage">
                <Row className="align-items-center h-100">
                    {/* Left Side Text */}
                    <Col md={6} className="text-white text-section">
                        <h1>Navigate Smarter with IndoorNav</h1>
                        <p>IndoorNav helps you find your way inside shopping malls with real-time indoor navigation, store info, and more.</p>
                        <Button variant="primary" size="lg" className="mt-3">Try IndorNav Now →</Button>
                    </Col>

                    {/* Right Side Image */}
                    <Col md={6} className="text-center">
                        <img src={mallImage} alt="Indoor Navigation Preview" className="img-fluid rounded" />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default HomePage;