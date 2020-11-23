const Post = require('../models/Post')

module.exports.store = (body) => {
    const post = new Post({
        title: body.title,
        description: body.description
    })

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