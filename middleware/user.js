const jwt = require("jsonwebtoken")
function userMiddleWare(req, res, next) {
    const secKey = process.env.userSecKey
    const token = req.headers.token
    const jwtToken = jwt.verify(token, secKey)
    if (token) {
        req.userId = jwtToken.id
        console.log(jwtToken)
        next()
    } else {
        res.json({ msg: "enter correct user detials" })
    }

}

module.exports = { userMiddleWare: userMiddleWare }