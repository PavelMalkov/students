const { Article } = require('../models')

class ArticlesController {
    async createArticle(req, res) {
        try {
            const { title, created_at, student_id } = req.body
            const article = await Article.create({ title, created_at, student_id })
            return res.json(article)
        } catch (e) {
            console.log(e)
        }
    }
    async getArticle(req, res) {
        try {
            const { id } = req.params
            const article = await Article.findOne({
                where: { id }
            })
            return res.json(article)
        } catch (e) {
            console.log(e)
        }
    }

    async getArticlesPage(req, res) {
        try {
            const { limit, page } = req.params
            const articles = await Article.findAll({
                order: [
                    ['title', 'ASC'],
                ],
                offset: ((page - 1) * limit),
                limit: limit,
            })
            return res.json(articles)
        } catch (e) {
            console.log(e)
        }
    }

    async getAllArticles(req, res) {
        try {
            const articles = await Article.findAll({
                order: [
                    ['title', 'ASC'],
                ]
            })
            return res.json(articles)
        } catch (e) {
            console.log(e)
        }
    }
    async updateArticle(req, res) {
        try {
            const { id } = req.body
            console.log(req.body)
            const article = await Article.update(
                req.body,
                {
                    where: { id },
                }
            )
            return res.json(article)
        } catch (e) {
            console.log(e)
        }
    }
    async deleteArticle(req, res) {
        try {
            const { id } = req.params
            const article = await Article.destroy({
                where: { id }
            })
            return res.json(article)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ArticlesController()