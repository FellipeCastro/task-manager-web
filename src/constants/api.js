import axios from "axios"

const api = axios.create({
    baseURL: "https://task-manager-api-theta-hazel.vercel.app"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default api 
