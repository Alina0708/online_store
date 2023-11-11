const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const commentController = require("../controllers/commentController")

router.get('/', commentController.getAll)
router.get('/comment/:bookId', commentController.getCommentsBook)
router.delete('/:id', checkRole('admin'), commentController.deleteComment)
router.post('/', commentController.createComments)

module.exports = router