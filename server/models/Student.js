const sequelize = require('../db')
const { DataTypes } = require('sequelize')
// разбить на два файла
const Student = sequelize.define('students', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.CHAR(1) },
    age: { type: DataTypes.INTEGER },
    course: { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, unique: true },
}, { timestamps: false })

module.exports = Student