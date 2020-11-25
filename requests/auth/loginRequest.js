const { check } = require('express-validator');

module.exports = [
    check('email').exists().withMessage('email field is required')
        .isEmail().withMessage('email field must be email formatted'),
    check('password').exists()
]