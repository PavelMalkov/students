import axios from "axios";

export default class PostService {
    static async getAllStudents() {
        const response = await axios.get('http://localhost:8080/api/students')
        return response
    }

    static async addStudent(student) {
        const response = await axios.post('http://localhost:8080/api/students/', {
            id: student.id,
            name: student.name,
            gender: student.gender,
            age: student.age,
            course: student.course,
            email: student.email,
            phone: student.phone
        })
        return response
    }

    static async deleteStudent(id) {
        const response = await axios.delete(`http://localhost:8080/api/students/${id}`)
        return response
    }

    static async getByStudentId(id) {
        const response = await axios.get('http://localhost:8080/api/students/' + id)
        return response;
    }
}