const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Posts', PostSchema)