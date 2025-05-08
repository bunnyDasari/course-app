const { Router } = require("express")
const userRouter = Router()
const { signUpUser } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userMiddleWare = require("../middleware/user")
const secKey = process.env.userSecKey


userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body
    console.log(password)
    const users = await signUpUser.findOne({ username })
    console.log(users)
    const compareUserPass = await bcrypt.compare(password, users.password)
    console.log(compareUserPass)
    if (users && compareUserPass) {
        const token = jwt.sign({
            id: users._id
        }, secKey)
        res.json({
            token: token,
            time: new Date(),
            name: users.username
        }).status(200)
        console.log(jwt.verify(token, secKey))
    } else {
        res.json({
            msg: "Enter correct username and password"
        }).status(404)
    }


})

userRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body
    const isUserFound = await signUpUser.find({ username })
    console.log(isUserFound)
    const hashedPassword = await bcrypt.hash(password, 10)
    if (isUserFound.length > 0) {
        res.json({ msg: "username already exsist" })
    } else {
        await signUpUser.create({ username: username, password: hashedPassword })
        res.json({
            msg: "user is created"
        })
    }
})

userRouter.put("/change-password", async (req, res) => {
    const { username, newpassword } = req.body
    const hashedPass = await bcrypt.hash(newpassword, 10)
    await signUpUser.updateOne({ username: username }, { password: hashedPass })
    res.json({ msg: "password is updated" })
})

module.exports = { userRouter: userRouter };