import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL
axios.defaults.baseURL = apiUrl

export default class StudentService {
    static async getAll() {
        return axios.get('/students')
    }

    static async getPage({ page, perPage }) {
        return axios.get(`students/page=${page}&limit=${perPage}`)
    }

    static async add(data) {
        return await axios.post('/students/', {
            name: data.name,
            gender: data.gender,
            age: data.age,
            course: data.course,
            email: data.email,
            phone: data.phone
        })
    }

    static async update(data) {
        return await axios.patch('/students/', {
            id: data.id,
            name: data.name,
            gender: data.gender,
            age: data.age,
            course: data.course,
            email: data.email,
            phone: data.phone
        })
    }

    static async delete(id) {
        return await axios.delete(`/students/${id}`)
    }

    static async getById(id) {
        return await axios.get('/students/' + id)
    }
}