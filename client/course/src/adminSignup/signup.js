import React, { useState } from 'react';
import './adminSignup.css';
import axios from 'axios';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'admin'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        await axios.post("http://localhost:5000/admin/signup",
            { username: formData.username, password: formData.password })
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-header">
                    <h1>Admin Signup</h1>
                    <p>Create your admin account</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    {error && <div className="signup-error">{error}</div>}

                    <div className="signup-input-group">
                        <label htmlFor="username">Full Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="signup-input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                            minLength="8"
                        />
                        <div className="password-requirements">
                            <ul>
                                <li>At least 8 characters long</li>
                                <li>Include uppercase and lowercase letters</li>
                                <li>Include at least one number</li>
                                <li>Include at least one special character</li>
                            </ul>
                        </div>
                    </div>



                    <div className="signup-input-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="signup-select"
                        >
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="signup-button">
                        Create Account
                    </button>

                    <p className="signup-link">
                        Already have an account? <a href="/admin">Login here</a>
                    </p>
                </form>
            </div>
        </div >
    );
};

export default AdminSignup; 