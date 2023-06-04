const { Article, Student } = require('../models')
const ApiError = require('../error/ApiError')

class ArticlesController {
    async createArticle(req, res, next) {
        try {
            const { title, createdAt, studentId } = req.body
            console.log(studentId)
            const student = await Student.findOne({
                where: { id: studentId }
            })
            console.log(student)
            const article = await Article.create({ title, createdAt, studentId })
            return res.json(article)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getArticle(req, res, next) {
        try {
            const { id } = req.params
            const article = await Article.findOne({
                where: { id }
            })
            return res.json(article)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getArticlesPage(req, res, next) {
        try {
            const { limit, page } = req.params
            const articles = await Article.findAndCountAll({
                order: [
                    ['title', 'ASC'],
                ],
                offset: ((page - 1) * limit),
                limit: limit,
            })
            return res.json(articles)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllArticles(req, res, next) {
        try {
            const articles = await Article.findAll()
            return res.json(articles)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async updateArticle(req, res, next) {
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
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteArticle(req, res, next) {
        try {
            const { id } = req.params
            const article = await Article.destroy({
                where: { id }
            })
            return res.json(article)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ArticlesController()