const db = require('../db');
const { Student } = require('../models')
const ApiError = require('../error/ApiError')

class StudentController {
    async createStudent(req, res) {
        // регулярные выражение const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        // phone var pattern = /^(\+7)[0-9]{10}/,

        const { name, gender, age, course, email, phone } = req.body




        const student = await db.query(
            `INSERT INTO students (name,gender,age,course,email,phone) VALUES ('${name}','${gender}','${age}','${course}','${email}','${phone}');`)
        return res.json(student)
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
        const student = await db.query(`select * from students order by name asc;`)
        return res.json(student)
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
        const { id } = req.body
        console.log(req.body)
        try {
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
        const { id } = req.params
        const student = await Student.destroy({
            where: { id }
        })
        return res.json(student)
    }
}

module.exports = new StudentController()