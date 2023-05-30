const Student = require('./Student')
const Article = require('./Article')

Student.hasMany(Article)
Article.belongsTo(Student)

module.exports = {
    Student,
    Article
}