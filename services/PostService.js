const { request } = require('express');
const Post = require('../models/Post')

module.exports.store = async (request) => {
    let newPost = {
        title: request.body.title,
        description: request.body.description,
        image: request.file,
        user: request.body.user_id
    };
    const post = new Post(newPost)

    return await post.save()
}

module.exports.get = async () => {
    return await Post.find().populate('user', 'username')
}

module.exports.getById = async (id) => {
    return await Post.findOne({ _id: id }).populate('user', 'username')
}

module.exports.update = async (id, request) => {
    let newData = {
        title: request.body.title,
        description: request.body.description,
    }

    if (request.file) {
        newData.image = request.file;
    }
    return await Post.updateOne({ _id: id }, { $set: newData })
}