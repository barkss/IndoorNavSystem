import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../styles/SignUp.css";
import logo from '../assets/logo.png';
import mallImage from '../assets/mall-image.jpg';


const SignUp = () => {
    const [profileImage, setProfileImage] = useState(null);

    return (
        <div className="signup-container">
            <Container fluid className="signup-wrapper">
                <Row className="justify-content-center align-items-center h-100">
                    {/* Left Side - SignUp Form */}
                    <Col md={5} className="signup-form">
                        <Card className="p-4">
                            {/* Profile Upload */}
                            <div className="profile-upload text-center">
                                <div className="profile-img">
                                    {profileImage ? (
                                        <img src={URL.createObjectURL(profileImage)} alt="Profile" />
                                    ) : (
                                        <span>Upload Profile</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                />
                            </div>

                            <h3 className="text-center">Sign Up</h3>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="example@email.com" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="••••••••" />
                                </Form.Group>

                                <Button variant="primary" className="w-100 mt-3">Sign Up</Button>
                            </Form>

                        </Card>
                    </Col>

                    {/* Right Side - Social Media Login */}
                    <Col md={5} className="social-login">
                        <div className="logo-container">
                            <img src={logo} alt="IndoorNav Logo" className="logo" />
                        </div>

                        <div className="social-buttons">
                            <Button variant="light" className="social-btn">
                                <FaFacebook className="social-icon" /> Facebook
                            </Button>
                            <Button variant="light" className="social-btn">
                                <FaGoogle className="social-icon" /> Google
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignUp;
