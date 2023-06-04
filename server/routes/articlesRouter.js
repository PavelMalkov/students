const Router = require('express')
const router = new Router()
const articlesController = require('../controller/articlesController')

router.post('/', articlesController.createArticle)

router.get('/', articlesController.getAllArticles)
router.get('/page=:page&limit=:limit', articlesController.getArticlesPage)
router.get('/:id', articlesController.getArticle)

router.patch('/', articlesController.updateArticle)

router.delete('/:id', articlesController.deleteArticle)

module.exports = router
