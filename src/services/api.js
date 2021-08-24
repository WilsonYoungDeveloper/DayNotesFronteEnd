import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-daynotes.herokuapp.com/'// 'http://localhost:3333/'
})

export default api;