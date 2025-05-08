const jwt = require("jsonwebtoken")
function checkAdminDetials(req, res, next) {
    const adminSecKey = process.env.adminSecKey
    const token = req.headers.token
    const decoded = jwt.verify(token, adminSecKey)
    console.log(decoded)
    if (token) {
        req.userId = decoded.token
        next()
    } else {
        res.json({
            msg: "You are not a admin"
        })
    }
}


module.exports = { checkAdminDetials }