const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const PostController = require('../controllers/PostController')
const StoreRequest = require('../requests/post/StoreRequest')
const UpdateRequest = require('../requests/post/UpdateRequest')
const uploadMiddleware = require('../config/file.upload')

router.post('/', authMiddleware, uploadMiddleware.single('image'), StoreRequest, PostController.store);
router.get('/', authMiddleware, PostController.index);
router.get('/:postId', authMiddleware, PostController.view);
router.post('/update/:postId', authMiddleware, uploadMiddleware.single('image'), UpdateRequest, PostController.update);

module.exports = router