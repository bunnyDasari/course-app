import React, { useState } from 'react';
import './index.css';
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        checkUser: ""
    });


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
        const response = await axios.post("http://localhost:5000/users/login", {
            username: formData.username, password: formData.password
        })
        Cookies.set("jwt_token", response.data.token, { expires: 5 })
        Cookies.set("username", response.data.name)
        if (response.data.token) {
            navigate("/dashboard")
            console.log(response.data)
        } else {
            console.log(response.data)
        }

    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <div className="signup-link">
                    Don't have an account? <a href="/signup">Sign up</a>
                </div>
                {formData.checkUser && <p></p>}
            </div>
        </div>
    );
};

export default Login
