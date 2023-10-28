const Router = require('express')
const router = new Router()
const autorController = require('../controllers/autorController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('admin'), autorController.create)
router.get('/', autorController.getAll)

module.exports = router