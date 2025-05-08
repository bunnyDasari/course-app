import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/bulk")
                console.log(response.data)
                setCourses(response.data.courses);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch courses. Please try again later.');
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="courses-loading">
                <div className="loading-spinner"></div>
                <p>Loading courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="courses-error">
                <p>{error}</p>
            </div>
        );
    }

    const onClickEnroll = (id) => {
        console.log(id)
    }

    return (
        <div className="courses-container">
            <div className="courses-header">
                <h2>Explore Our Courses</h2>
                <p>Discover a wide range of courses to enhance your skills</p>
            </div>

            <div className="courses-grid">
                {courses.map((course) => (
                    <div className="course-card" key={course._id}>
                        <div className="course-image">
                            <img
                                src={course.image || 'https://via.placeholder.com/300x200'}
                                alt={course.courseName}
                            />
                            <div className="course-price">${course.price}</div>
                        </div>

                        <div className="course-content">
                            <h3>{course.courseName}</h3>
                            <p className="course-description">{course.discription}</p>

                            <div className="course-meta">
                                <span className="course-duration">
                                    <i className="fas fa-clock"></i>
                                    {course.duration} hours
                                </span>
                                <span className="course-level">
                                    <i className="fas fa-signal"></i>
                                    Beginner
                                </span>
                            </div>

                            <button className="enroll-button" onClick={() => onClickEnroll(course._id)}>
                                Enroll Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses; 