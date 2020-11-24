const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');

require('dotenv/config');

const User = require('../models/User')

module.exports.register = (body) => {
    const user = new User({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt)
    })

    return user.save()
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