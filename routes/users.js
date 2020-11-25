const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const LoginRequest = require('../requests/auth/loginRequest')
const RegisterRequest = require('../requests/auth/RegisterRequest')

router.post('/register', RegisterRequest, AuthController.register)
router.post('/login', LoginRequest, AuthController.login)

module.exports = router