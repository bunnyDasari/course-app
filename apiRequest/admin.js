const { Router, application } = require("express")
const adminRouter = Router()
const { adminDetails, courseDetails } = require("../db")
const { checkAdminDetials } = require("../middleware/admin")
const jwt = require("jsonwebtoken")
const { compareSync } = require("bcrypt")
const adminSecKey = process.env.adminSecKey



adminRouter.post("/login", async (req, res) => {
    const { username, password } = req.body
    const findUser = await adminDetails.findOne({ username, password })
    console.log(findUser)
    if (findUser) {
        const token = jwt.sign({
            token: findUser._id
        }, adminSecKey)
        console.log(jwt.verify(token, adminSecKey))
        res.json({
            username: findUser.username,
            token: token
        })
    } else {
        res.json({ msg: "user not found " })
    }
})

adminRouter.post("/signup", async (req, res) => {
    const { username, password, email } = req.body
    try {
        await adminDetails.create({ username: username, password: password, email: email })
        res.json({
            msg: "user created successfully"
        })
    } catch (error) {
        console.log(error)
    }
})


adminRouter.post("/create-courses", checkAdminDetials, async (req, res) => {
    const createrId = req.userId
    const { courseName, price, discription } = req.body
    const courseData = await courseDetails.create({
        createrId: createrId,
        courseName: courseName,
        price: price,
        discription: discription
    })
    console.log(createrId)
    res.json({ courseId: courseData._id })
    // res.json({ id: createrId })
})

adminRouter.put("/update-course", checkAdminDetials, async (req, res) => {
    const createrId = req.userId
    console.log(createrId)
    const { courseName, price, discription, courseId } = req.body
    const courseData = await courseDetails.updateOne({
        _id: courseId,
        createrId: createrId
    }, {
        courseName: courseName,
        price: price,
        discription: discription
    })
    res.json({ msg: "course updated with id" + courseId, courseData })
})

adminRouter.delete("/delete-course", async (req, res) => {
    const { courseId } = req.body
    await courseDetails.deleteOne({ _id: courseId })
    res.json({
        msg: "course deleted successfully"
    })
})

adminRouter.get("/", async (req, res) => {
    const { createrId } = req.body
    const courses = await courseDetails.find({ createrId })
    res.json({
        courses
    })
})

module.exports = {
    adminRouter
}