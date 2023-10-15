const Router = require('express')
const router = new Router()
const autorController = require('../controllers/autorController')


router.post('/', autorController.create)
router.get('/', autorController.getAll)

module.exports = router