const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
//const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create/', basketController.createBasketBook)
router.get('/byUser/:userId', basketController.getBasketIdByUserId)
router.get('/', basketController.getAllBasket)
router.get('/basketbook/', basketController.getAllBasketBook)
router.get('/basketbooks/:userId', basketController.getBasketBooksByUserId)
router.get('/basketbooks/increaseCount/:bookId', basketController.increaseCount)
router.get('/basketbooks/decreaseCount/:bookId', basketController.decreaseCount)
router.delete('/deleteBasketBooksByUserByBook/', basketController.deleteBasketBooksByUserByBook)
router.delete('/basketbooks/deletebasket/', basketController.deleteBasketBooksByUser)
router.delete('/basketbook/:id', basketController.deleteAllBasketBooks)




module.exports = router