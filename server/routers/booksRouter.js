const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('admin'), booksController.create)
router.get('/', booksController.getAll)
router.get('/:title', booksController.getOneName)
router.get('/autor/:autor', booksController.getOneAutor)

module.exports = router