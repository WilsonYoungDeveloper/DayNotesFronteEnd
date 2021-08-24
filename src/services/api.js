import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333/'//'https://api-daynotes.herokuapp.com/'
})

export default api;