const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const rateController = require("../controllers/rateController")


router.post('/', rateController.createRate)
router.get('/', rateController.getAll)
router.get('/userrate', rateController.getRatingByUserIdAndBookId)
router.delete('/:id', checkRole('admin'), rateController.deleteRateId)

module.exports = router