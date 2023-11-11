const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const rateController = require("../controllers/rateController")


router.post('/', checkRole('admin'), rateController.createRate)
router.get('/', rateController.getAll)
//router.delete('/:id', checkRole('admin'), genreController.deleteGenreId)

module.exports = router