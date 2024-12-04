import axios from "axios"

const axioInstance = axios.create({ baseURL: process.env.API_URL })

// do something before requesting
axioInstance.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})
// do something after responding
axioInstance.interceptors.response.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

export default axioInstance