const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const mailer = require('../config/mailer')
require('dotenv/config');

const User = require('../models/User')

module.exports.register = async (body) => {
    const user = await User.create({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt)
    })
    mailer({ from: "blogApp@blog.com", to: user.email, subject: "welcome Mail", text: "Welcome To Your Blog!" })
    return user
}

module.exports.login = async (body) => {
    const user = await User.findOne({ email: body.email })
    if (!user) return null

    let validPassword = bcrypt.compareSync(body.password, user.password);
    if (!validPassword) return null

    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

module.exports.getAuthenticatedUser = (req) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return null

    return jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
        if (err) return null
        return auth.user
    })
}