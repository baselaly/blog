const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const PostController = require('../controllers/PostController')

router.post('/', authMiddleware, PostController.store);
router.get('/', authMiddleware, PostController.index);
router.get('/:postId', authMiddleware, PostController.view);
router.post('/update/:postId', authMiddleware, PostController.update);

module.exports = router