const Post = require('../models/Post')

const store = (body) => {
    const post = new Post({
        title: body.title,
        description: body.description
    })

    return post.save()
}

const get = () => {
    return Post.find()
}

const getById = (id) => {
    return Post.findById(id)
}

const update = (id, body) => {
    return Post.updateOne({ _id: id }, {
        $set: {
            title: body.title,
            description: body.description
        }
    })
}

module.exports.store = store
module.exports.get = get
module.exports.getById = getById
module.exports.update = update