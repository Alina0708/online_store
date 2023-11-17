const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const statusController = require("../controllers/statusController")


router.post('/', checkRole('admin'), statusController.createStatus)
router.get('/', checkRole('admin'), statusController.getAllStatus)
router.get('/name/:id', statusController.getStatusNameById)
router.delete('/:id', checkRole('admin'), statusController.deleteStatusName)
router.put('/paid/', statusController.changeOrderStatusOnPaid)


module.exports = router