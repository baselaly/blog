const mongoose = require('mongoose');
const fs = require('fs')

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function setImage(file) {
    let buffer = file.buffer
    let fileName = makeid(5) + '-' + file.originalname
    fs.writeFile('./uploads/posts/' + fileName, buffer, 'binary', function (err) {
        if (err) throw err
    })
    return fileName
}

function getImage(image) {
    return 'test'
}

const PostSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String,
        set: setImage,
        get: getImage
    }
});

module.exports = mongoose.model('Posts', PostSchema)