const { request } = require('express');
const Post = require('../models/Post')

module.exports.store = async (request) => {
    let newPost = {
        title: request.body.title,
        description: request.body.description,
        image: request.file
    };

    const post = new Post(newPost)
    return await post.save()
}

module.exports.get = async () => {
    return await Post.find()
}

module.exports.getById = async (id) => {
    return await Post.findById(id)
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