const Router = require('express')
const router = new Router()
const genreController = require('../controllers/genreController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('admin'), genreController.create)
router.get('/', genreController.getAll)
router.delete('/:id', checkRole('admin'), genreController.deleteGenreId)

module.exports = router