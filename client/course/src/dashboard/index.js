import React from 'react';
import './index.css';
import Cookies from "js-cookie"
import Courses from '../components/Courses';
import UserCourses from '../userCourses';
const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <h1>Welcome to Your Dashboard {Cookies.get("username")}</h1>
                <div className="dashboard-content">
                    <p>Your learning journey starts here!</p>
                </div>
                <UserCourses />
            </div>
        </div>
    );
};

export default Dashboard; 