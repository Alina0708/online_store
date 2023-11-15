const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const statusController = require("../controllers/statusController")


router.post('/', checkRole('admin'), statusController.createStatus)
router.get('/', checkRole('admin'), statusController.getAllStatus)
router.delete('/:id', checkRole('admin'), statusController.deleteStatusName)

module.exports = router