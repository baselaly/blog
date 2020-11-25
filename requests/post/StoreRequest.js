const { check } = require('express-validator');

module.exports = [
    check('title').exists().isLength({ max: 200 }),
    check('description').exists().isLength({ max: 5000 })
]