import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Cookies from "js-cookie"

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // This should come from your auth context/state
    const navigate = useNavigate();

    const onClickLogout = () => {
        Cookies.remove("jwt_token")
        Cookies.remove("username")
        navigate("/login")
    }
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="navbar-brand">
                        Course Platform
                    </Link>
                </div>

                <div className="navbar-center">
                    {isLoggedIn && (
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="search-input"
                            />
                            <button className="search-button">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    )}
                </div>

                <div className="navbar-right">
                    {isLoggedIn ? (
                        <>
                            <div className="navbar-notifications">
                                <button
                                    className="notification-button"
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                >
                                    <i className="fas fa-bell"></i>
                                    <span className="notification-badge">3</span>
                                </button>
                                {isNotificationsOpen && (
                                    <div className="notifications-dropdown">
                                        <div className="notification-item">
                                            <p>New course available: React Advanced</p>
                                            <span className="notification-time">2 hours ago</span>
                                        </div>
                                        <div className="notification-item">
                                            <p>Your assignment is due tomorrow</p>
                                            <span className="notification-time">5 hours ago</span>
                                        </div>
                                        <div className="notification-item">
                                            <p>New message from instructor</p>
                                            <span className="notification-time">1 day ago</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="navbar-profile">
                                <button
                                    className="profile-button"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="Profile"
                                        className="profile-image"
                                    />
                                    <span className="profile-name">John Doe</span>
                                </button>
                                {isProfileOpen && (
                                    <div className="profile-dropdown">
                                        <Link to="/profile" className="dropdown-item">
                                            <i className="fas fa-user"></i> Profile
                                        </Link>
                                        <Link to="/settings" className="dropdown-item">
                                            <i className="fas fa-cog"></i> Settings
                                        </Link>
                                        <Link to="/my-courses" className="dropdown-item">
                                            <i className="fas fa-book"></i> My Courses
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button onClick={handleLogout} className="dropdown-item">
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="navbar-auth">
                            <button onClick={handleLogin} className="login-button">
                                Login
                            </button>
                            <button onClick={onClickLogout} className="login-button">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 