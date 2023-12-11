const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('admin'), booksController.create)
router.get('/', booksController.getAll)
router.get('/:id', booksController.getBookOne)
//router.get('/:title', booksController.getOneName)
router.get('/autor/:autor', booksController.getOneAutor)
router.put('/search/', booksController.findBooksByAuthorOrName)
router.put('/update/:id', checkRole('admin'),booksController.update)
router.delete('/:id', checkRole('admin'), booksController.deleteBookById)

module.exports = router