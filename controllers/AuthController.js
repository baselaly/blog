
const UserService = require('../services/UserService')
const LoginRequest = require('../requests/auth/loginRequest')
const RegisterRequest = require('../requests/auth/RegisterRequest')
const { validationResult } = require('express-validator');

module.exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let body = req.body
        let user = await UserService.register(body)
        res.json({ user: user })
    } catch (error) {
        res.json({ message: error })
    }
}

module.exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let body = req.body
        let token = await UserService.login(body)
        res.json({ token: token })
    } catch (error) {
        res.json({ message: error })
    }

}