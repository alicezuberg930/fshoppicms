import axios from "axios"
import { getCachedSession } from "../common/utils"

const axioInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: { Accept: "application/json" },
})

export const instanceWithoutToken = axios.create({
    baseURL: process.env.API_URL,
    headers: { Accept: "application/json" },
})

// do something before requesting
axioInstance.interceptors.request.use(async (config) => {
    if (typeof window !== "undefined") {
        const session = await getCachedSession() // Fetch or retrieve cached session
        console.log(session ?? "no session")
        if (session && config.url !== "/.netlify/functions/getlist") {
            config.headers["Authorization"] = `Bearer ${session.user.access_token}`
        } else {
            delete config.headers["Authorization"]
        }
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
// do something after responding
axioInstance.interceptors.response.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

export default axioInstance
