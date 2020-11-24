const express = require('express')
const router = express.Router()
const PostService = require('../services/PostService')
const authMiddleware = require('../middlewares/auth')

router.post('/', authMiddleware.auth, async (req, res) => {
    try {
        let body = req.body
        let newPost = await PostService.store(body);
        res.json({ post: newPost })
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/', authMiddleware.auth, async (req, res) => {
    try {
        let posts = await PostService.get()
        res.json({ posts: posts })
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/:postId', authMiddleware.auth, async (req, res) => {
    try {
        let id = req.params.postId
        const post = await PostService.getById(id)
        res.json({ post: post })
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/update/:postId', authMiddleware.auth, async (req, res) => {
    try {
        let body = req.body
        let postId = req.params.postId
        let post = await PostService.update(postId, body);
        res.json({ post: post })
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router