const Router = require('express')
const router = new Router()

const autorRouter = require('./autorRouter')
const userRouter = require('./userRouter')
const genreRouter = require('./genreRouter')
const booksRouter = require('./booksRouter')

router.use('/user', userRouter)
router.use('/books', booksRouter)
router.use('/genre', genreRouter)
router.use('/autor', autorRouter)

module.exports = router