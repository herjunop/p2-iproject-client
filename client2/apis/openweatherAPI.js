import axios from "axios"

const baseURL = 'https://api.openweathermap.org/data/2.5/onecall'

const instance = axios.create({
    baseURL
})

export default instance;