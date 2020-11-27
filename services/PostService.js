const Post = require('../models/Post')

module.exports.store = (request) => {
    let newPost = {
        title: request.body.title,
        description: request.body.description,
        image: request.file
    };

    const post = new Post(newPost)
    return post.save()
}

module.exports.get = () => {
    return Post.find()
}

module.exports.getById = (id) => {
    return Post.findById(id)
}

module.exports.update = (id, body) => {
    return Post.updateOne({ _id: id }, {
        $set: {
            title: body.title,
            description: body.description
        }
    })
}