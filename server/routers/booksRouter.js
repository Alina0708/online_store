const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')

router.post('/', booksController.create)
router.get('/', booksController.getAll)
router.get('/:id', booksController.genOn)

module.exports = router