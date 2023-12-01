const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const orderController = require("../controllers/orderController")



router.post('/orderbook/', orderController.createOrderBook)
router.get('/orderbook/', orderController.getAllOrderBooks)
router.get('/groupuser/', checkRole('admin'), orderController.getOrdersGroupedByUserStatus)
router.get('/groupuser/completed/', checkRole('admin'), orderController.getOrdersGroupedByUserStatusCompleted)
router.get('/orderbook/:id', orderController.getOrderBookByUserId)
router.get('/orderbook/history/:id', orderController.getHistoryOrders)
router.delete('/orderbook/delete/', orderController.deleteOrderBooksByOrderId)
router.post('/', orderController.createOrder)
router.get('/', orderController.getAllOrders)
router.delete('/deleteorder', checkRole('admin'), orderController.deleteOrder)
router.delete('/deleteorderandorderbook', orderController.delOrderAndOrderBooks)

module.exports = router