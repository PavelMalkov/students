import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL
axios.defaults.baseURL = apiUrl

export default class ArticleService {
    static async getAll() {
        return axios.get('/articles')
    }

    static async getPage({ page, perPage }) {
        return axios.get(`articles/page=${page}&limit=${perPage}`)
    }

    static async add(data) {
        console.log(data)
        return await axios.post('/articles', {
            title: data.title,
            studentId: data.studentId,
            ticreatedAttle: data.createdAt,
        })
    }

    static async update(data) {
        console.log(data)
        return await axios.patch('/articles', {
            id: data.id,
            title: data.title,
            studentId: data.studentId,
            ticreatedAttle: data.createdAt,
        })
    }

    static async delete(id) {
        return await axios.delete(`/articles/${id}`)
    }

    static async getById(id) {
        console.log(id)
        return await axios.get('/articles/' + id)
    }
}