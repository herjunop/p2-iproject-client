import axios from "axios"

const baseURL = 'http://active-8.herokuapp.com'

const instance = axios.create({
    baseURL
})

export default instance;