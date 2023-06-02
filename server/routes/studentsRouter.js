const Router = require('express')
const router = new Router()
const studentController = require('../controller/studentsController')

router.post('/', studentController.createStudent)

router.get('/', studentController.getAllStudents)
router.get('/page=:page&limit=:limit', studentController.getStudentsPage)
router.get('/:id', studentController.getStudent)

router.put('/', studentController.updateStudent)

router.delete('/:id', studentController.deleteStudent)

module.exports = router
