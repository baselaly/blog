const PostService = require('../services/PostService')
const UserService = require('../services/UserService')
const { validationResult } = require('express-validator');

module.exports.store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let authenticatedUser = UserService.getAuthenticatedUser(req)
        req.body.user_id = authenticatedUser._id;
        let newPost = await PostService.store(req);
        res.json({ post: newPost })
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports.index = async (req, res) => {
    try {
        let posts = await PostService.get()
        res.json({ posts: posts })
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports.view = async (req, res) => {
    try {
        let id = req.params.postId
        const post = await PostService.getById(id)
        res.json({ post: post })
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports.update = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let postId = req.params.postId
        let post = await PostService.update(postId, req);
        res.json({ post: post })
    } catch (err) {
        res.json({ message: err })
    }
}