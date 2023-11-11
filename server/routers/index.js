const Router = require('express')
const router = new Router()

const autorRouter = require('./autorRouter')
const userRouter = require('./userRouter')
const genreRouter = require('./genreRouter')
const booksRouter = require('./booksRouter')
const rateRouter = require('./rateRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter)
router.use('/books', booksRouter)
router.use('/genre', genreRouter)
router.use('/autor', autorRouter)
router.use('/rate', rateRouter)
router.use('/comments', commentRouter)

module.exports = router