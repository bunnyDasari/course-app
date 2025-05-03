require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const { userRouter } = require("./apiRequest/usersApi")
const { useCourse } = require("./apiRequest/coursesApi")
const { adminRouter } = require("./apiRequest/admin")


app.use(express.json())
app.use("/users", userRouter)
app.use("/course", useCourse)
app.use("/admin", adminRouter)

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected...")
    app.listen(3000, () => console.log("server is running at port 3000"))
}
main()
