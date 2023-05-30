const Router = require('express')
const router = new Router()

const articlesRouter = require('./articlesRouter')
const studentsRouter = require('./studentsRouter')


router.use('/articles',articlesRouter)
router.use('/students',studentsRouter)

module.exports = router
