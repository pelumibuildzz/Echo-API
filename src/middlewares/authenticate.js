const dotenv = require('dotenv');
dotenv.config()
const jwt = require('jsonwebtoken')

function authenticateUserwebtoken(req, res, next) {
    const authheader = req.header['authorization']
    const token = authheader && authheader.split(' ')[1]
    if(!token) return res.sendStatus(401)
    jwt.verify(token, process.env.USER_SECRET_TOKEN, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
    })
}

function isCouncil( req, res, next ) {
    if (req.user.role != "council") return res.sendStatus(403)
        next()
}

module.exports = { authenticateUserwebtoken, isCouncil }