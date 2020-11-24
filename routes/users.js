const express = require('express')
const router = express.Router()
const UserService = require('../services/UserService')


router.post('/register', async (req, res) => {
    try {
        let body = req.body
        let user = await UserService.register(body)
        res.json({ user: user })
    } catch (error) {
        res.json({ message: error })
    }
})

router.post('/login', async (req, res) => {
    try {
        let body = req.body
        let token = await UserService.login(body)
        res.json({ token: token })
    } catch (error) {
        res.json({ message: error })
    }

})

module.exports = router