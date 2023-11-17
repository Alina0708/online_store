const Router = require('express')
const router = new Router()

const autorRouter = require('./autorRouter')
const userRouter = require('./userRouter')
const genreRouter = require('./genreRouter')
const booksRouter = require('./booksRouter')
const rateRouter = require('./rateRouter')
const commentRouter = require('./commentRouter')
const basketRouter = require('./basketRouter')
const statusRouter = require('./statusRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/books', booksRouter)
router.use('/genre', genreRouter)
router.use('/autor', autorRouter)
router.use('/rate', rateRouter)
router.use('/comments', commentRouter)
router.use('/basket', basketRouter)
router.use('/status', statusRouter)
router.use('/order', orderRouter)


module.exports = router