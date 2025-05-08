import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const response = await axios.post("http://localhost:5000/admin/login", { username: formData.username, password: formData.password })
        console.log(response.data)
        Cookies.set("Jwt_token", response.data.token, { expires: 5 })
        Cookies.set("name", response.data.username, { expires: 5 })

        if (response.data.token) {
            navigate("/admin-courses")
        }
        console.log(response.data)
    };

    return (
        <div className="admin-container">
            <div className="admin-login-box">
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <p>Please login to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    {error && <div className="admin-error">{error}</div>}

                    <div className="admin-input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="admin-input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="admin-login-button">
                        Login
                    </button>
                    <p className="signup-link">
                        Create an account? <a href="/admin-signup">signup here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
