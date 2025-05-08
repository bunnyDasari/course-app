require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const { userRouter } = require("./apiRequest/usersApi")
const { useCourse } = require("./apiRequest/coursesApi")
const { adminRouter } = require("./apiRequest/admin")

app.use(cors("*"))
app.use(express.json())
app.use("/users", userRouter)
app.use("/course", useCourse)
app.use("/admin", adminRouter)

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected...")
    app.listen(process.env.PORT, () => console.log(`server is running at port ${process.env.PORT}`))
}
main()
