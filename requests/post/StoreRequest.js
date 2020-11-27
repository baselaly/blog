const { checkSchema } = require('express-validator');

module.exports = checkSchema({
    title: {
        in: ['body'],
        trim: true,
        notEmpty: {
            errorMessage: "title field is required"
        },
        isLength: {
            options: {
                max: 200,
            },
            errorMessage: "title field must be less than 200 chars"
        },
    },
    description: {
        in: ['body'],
        trim: true,
        notEmpty: {
            errorMessage: "description field is required"
        },
        isLength: {
            options: {
                max: 1000,
            },
            errorMessage: "description field must be less than 1000 chars"
        },
    },
    image: {
        custom: {
            options: (value, { req }) => {
                if (!req.file) {
                    return Promise.reject("Image Field is required")
                }
                if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/png') {
                    return Promise.reject("Image Field is must be type jpg/jpeg/png")
                }
                if (req.file.size > 1024 * 1024 * 5) {
                    return Promise.reject("Image is must be lessthan 5 mb")
                }
                return true
            }
        }
    }
})