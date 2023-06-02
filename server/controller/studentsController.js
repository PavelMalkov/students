const db = require('../db');
const { Student } = require('../models')
const ApiError = require('../error/ApiError')

class StudentController {
    async createStudent(req, res, next) {
        try {
            const { name, gender, age, course, email, phone } = req.body
            // регулярные выражение 
            // mail
            const mail_mask = /^[a-zA-Z0-9._]+@[^\s@]+\.[^\s@]+$/
            // phone
            const phone_mask = /^((8|\+7)[\- ]?)?[\d\- ]{10}$/
            let validationMail = mail_mask.test(email)
            let validationPhone = phone_mask.test(phone)
            console.log(req.body)
            console.log(validationMail, validationPhone)
            if (!(validationMail && validationPhone)) {
                return next(ApiError.badRequest({ message: "Не правельный ввод " + (validationMail ? ' ' : 'почты ') + (validationPhone ? '' : 'телефона') }))
            }

            const student = await db.query(
                `INSERT INTO students (name,gender,age,course,email,phone) VALUES ('${name}','${gender}','${age}','${course}','${email}','${phone}');`)
            return res.json(student)
        } catch (error) {
            console.log(error)
        }
    }
    async getStudent(req, res, next) {
        try {
            const { id } = req.params
            const student = await Student.findOne({
                where: { id }
            })
            return res.json(student)
        } catch (e) {
            console.log(e)
        }
    }
    async getAllStudents(req, res, next) {
        try {
            const student = await db.query(`select * from students order by name asc;`)
            return res.json(student)
        } catch (e) {
            console.log(e)
        }
    }

    async getStudentsPage(req, res) {
        const { limit, page } = req.params
        try {
            const students = await Student.findAll({
                order: [
                    ['name', 'ASC'],
                ],
                offset: ((page - 1) * limit),
                limit: limit,
            })
            return res.json(students)
        } catch (e) {
            console.log(e)
        }
    }
    async updateStudent(req, res) {
        try {
            const { id } = req.body
            console.log(req.body)
            const student = await Student.update(
                req.body,
                {
                    where: { id: id },
                }
            )
            return res.json(student)
        } catch (e) {
            console.log(e)
        }
    }
    async deleteStudent(req, res) {
        try {
            const { id } = req.params
            const student = await Student.destroy({
                where: { id }
            })
            return res.json(student)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new StudentController()