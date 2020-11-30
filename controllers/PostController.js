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
        let authenticatedUser = UserService.getAuthenticatedUser(req)
        let posts = await PostService.getBy({ user: authenticatedUser._id })
        res.json({ posts: posts })
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports.view = async (req, res) => {
    try {
        let id = req.params.postId
        let authenticatedUser = UserService.getAuthenticatedUser(req)
        const post = await PostService.getSingleBy({ _id: id, user: authenticatedUser._id })
        if (!post) return res.status(404).json({ message: "Not Found" })
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
        let authenticatedUser = UserService.getAuthenticatedUser(req)
        const userPost = await PostService.getSingleBy({ _id: postId, user: authenticatedUser._id })
        if (!userPost) return res.status(404).json({ message: "Not Found" })
        let post = await PostService.update(postId, req);
        res.json({ post: post })
    } catch (err) {
        res.json({ message: err })
    }
}