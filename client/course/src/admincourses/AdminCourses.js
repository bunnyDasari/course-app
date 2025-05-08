import React, { useEffect, useState } from 'react';
import './AdminCourses.css';
import axios from 'axios';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';

const AdminCourses = () => {
    const [course, setCourses] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [createCourseTitle, setCreateCourseTitle] = useState("")
    const [createCourseDiscription, setCreateCourseTitleDiscription] = useState("")
    const [createCoursePrce, setCreateCoursePrice] = useState("")
    const [duration, setCreateCourseTitleDuration] = useState("")


    const navigate = useNavigate()
    const onClickLogout = () => {
        Cookies.remove("Jwt_token")
        navigate("/admin")
    }

    useEffect(() => {
        const getCourses = async () => {
            const response = await axios.get("http://localhost:5000/admin/", {
                headers: { token: Cookies.get("Jwt_token") }
            })
            setCourses(response.data.courses)
            console.log(response.data)
        }
        getCourses()
    }, [])





    console.log(course)

    const onclickDelete = async (id) => {
        await axios.delete("http://localhost:5000/admin/delete-course", { data: { courseId: id } })
        console.log(id)
    }
    const onCLickAddCourse = async (e) => {
        e.preventDefault()

        const courseDetails = {
            courseName: createCourseTitle,
            discription: createCourseDiscription,
            price: createCoursePrce,
            duration: duration
        }
        const response = await axios.post(
            "http://localhost:5000/admin/create-courses",
            courseDetails,
            {
                headers: {
                    token: Cookies.get("Jwt_token")
                }
            }
        )
        console.log(courseDetails, response)
    }

    console.log()
    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="admin-courses-container">
            <div className="admin-courses-header">
                <h1>Welcome {Cookies.get("name")}!!</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="add-course-button" onClick={handleOpenModal}>
                        Add New Course
                    </button>
                    <button className="add-course-button" style={{ background: '#e74c3c' }} onClick={onClickLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="courses-grid">
                {/* Sample Course Cards */}
                {course.map(c => (
                    <div className="course-card" key={c._id}>
                        <div className="course-header">
                            <h3>{c.courseName}</h3>
                            <div className="course-level">Beginner</div>
                        </div>
                        <p className="course-description">
                            Learn web development from scratch. Master HTML, CSS, JavaScript, and modern frameworks.
                        </p>
                        <div className="course-details">
                            <span>Duration: 40 hours</span>
                            <span>Price: {c.price}</span>
                            <span>Category: Programming</span>
                        </div>
                        <div className="course-actions">
                            <button className="edit-button">Edit</button>
                            <button className="delete-button" onClick={() => onclickDelete(c._id)}>Delete</button>
                        </div>
                    </div>
                ))}



            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Course</h2>
                        <form className="course-form">
                            <div className="form-group">
                                <label htmlFor="title">Course Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Enter course title"
                                    onChange={(e) => setCreateCourseTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    placeholder="Enter course description"
                                    onChange={(e) => setCreateCourseTitleDiscription(e.target.value)}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="duration">Duration (hours)</label>
                                    <input
                                        type="number"
                                        id="duration"
                                        placeholder="Enter duration"
                                        onChange={(e) => setCreateCourseTitleDuration(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price ($)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="Enter price"
                                        onChange={(e) => setCreateCoursePrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        placeholder="Enter category"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="level">Level</label>
                                    <select id="level">
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="submit" className="save-button" onClick={onCLickAddCourse}>
                                    Add Course
                                </button>
                                <button type="button" className="cancel-button" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCourses; 