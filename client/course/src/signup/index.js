import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/users/signup",
                { username: formData.username, password: formData.password });
            console.log(response.data);
            setSuccess(true);
            setFormData({ username: '', password: '' }); // Clear form after successful signup
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            required
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>
                <div className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </div>
                {success && (
                    <p className="success-message">Account created successfully! You can now login.</p>
                )}
            </div>
        </div>
    );
};

export default Signup;
