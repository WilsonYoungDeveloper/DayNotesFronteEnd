import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-daynotes.herokuapp.com/'
})

export default api;