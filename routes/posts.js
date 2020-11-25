const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const PostController = require('../controllers/PostController')
const StoreRequest = require('../requests/post/StoreRequest')
const UpdateRequest = require('../requests/post/UpdateRequest')
const multer = require('multer')
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage })

router.post('/', uploadMiddleware.single('image'), StoreRequest, PostController.store);
router.get('/', authMiddleware, PostController.index);
router.get('/:postId', authMiddleware, PostController.view);
router.post('/update/:postId', UpdateRequest, authMiddleware, PostController.update);

module.exports = router