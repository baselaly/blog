const { check } = require('express-validator');
const User = require('../../models/User')

module.exports = [
    check('email').exists().withMessage('email field is required')
        .isEmail().withMessage('email field must be email formatted').isLength({ max: 200 })
        .custom(async (email) => {
            let user = await User.findOne({ email: email });
            if (user) {
                return Promise.reject()
            }
        }).withMessage('email already Exist'),
    check('password').exists().isLength({ min: 8 }),
    check('username').exists().isLength({ max: 200 })
]