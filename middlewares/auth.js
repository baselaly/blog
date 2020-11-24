const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports.auth = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({ message: "unauthorized" }) // if there isn't any token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "unauthorized" })
        next() // pass the execution off to whatever request the client intended
    })
}