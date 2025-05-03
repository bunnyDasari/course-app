const mongoose = require("mongoose")
const objectId = mongoose.Schema.ObjectId

const signUp = new mongoose.Schema({
    username: String,
    // email: String,
    password: String,
    // confirmPassoward: String,
})

const courseDetails = new mongoose.Schema({
    createrId: objectId,
    courseName: String,
    price: Number,
    discription: String
})

const adminDetails = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: String
})

const userCourses = new mongoose.Schema({
    userId: objectId,
    courseId: objectId
})




const signUpUser = mongoose.model("users", signUp)
const courses = mongoose.model("courses", courseDetails)
const adminLogin = mongoose.model("admin", adminDetails)
const userCourseDetails = mongoose.model("usercourses", userCourses)
module.exports = {
    signUpUser: signUpUser,
    courseDetails: courses,
    adminDetails: adminLogin,
    userCourseDetails: userCourseDetails
}
