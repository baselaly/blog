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

module.exports.getBy = async (filters) => {
    return await Post.find(filters).populate('user', 'username')
}

module.exports.getSingleBy = async (filters) => {
    return await Post.findOne(filters).populate('user', 'username')
}

module.exports.update = async (id, request) => {
    let newData = {
        title: request.body.title,
        description: request.body.description,
    }

    if (request.file) {
        newData.image = request.file;
    }
    return await Post.findByIdAndUpdate(id, { $set: newData })
}