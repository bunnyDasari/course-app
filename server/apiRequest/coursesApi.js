const { Router } = require("express")
const useCourse = Router()

const jwt = require("jsonwebtoken")
const { userMiddleWare } = require("../middleware/user")
const { userCourseDetails, courseDetails } = require("../db")



useCourse.post("/get-course", userMiddleWare, async (req, res) => {
    const { courseId } = req.body
    const userId = req.userId
    await userCourseDetails.create({
        userId: userId,
        courseId: courseId
    })
    res.json({
        courseId 
    })
})

useCourse.get("/", userMiddleWare, async (req, res) => {
    const userId = req.userId
    console.log(userId)
    const userfind = await userCourseDetails.find({ userId })
    const userCourse = await courseDetails.find({ _id: { $in: userfind.map(e => e.courseId) } })
    res.json({
        userfind,
        userCourse
    })
})



module.exports = { useCourse: useCourse }
