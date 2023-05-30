const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Article = sequelize.define('article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    studentId: { type: DataTypes.INTEGER, field: "student_id" },
}, { timestamps: false })

module.exports = Article