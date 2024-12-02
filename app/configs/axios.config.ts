import axios from "axios"
import { setupCache } from "axios-cache-interceptor"

const setup = axios.create({ baseURL: process.env.API_URL })

const instance = setupCache(
    setup,
    // { storage: buildWebStorage(localStorage, 'axios-cache:') }
)

// do something before requesting
// instance.interceptors.request.use(function (config) {
//     return config
// }, function (error) {
//     return Promise.reject(error)
// })
// do something after responding
// instance.interceptors.response.use(function (config) {
//     return config
// }, function (error) {
//     return Promise.reject(error)
// })

export default instance