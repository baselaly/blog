const PostService = require('../services/PostService')

module.exports.store = async (req, res) => {
    try {
        let body = req.body
        let newPost = await PostService.store(body);
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
        let body = req.body
        let postId = req.params.postId
        let post = await PostService.update(postId, body);
        res.json({ post: post })
    } catch (err) {
        res.json({ message: err })
    }
}