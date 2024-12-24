import axios from "axios"
import { getCachedSession } from "../common/utils"

const axioInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: { Accept: "application/json" },
})

// do something before requesting
axioInstance.interceptors.request.use(async (config) => {
    if (typeof window !== "undefined") {
        const session = await getCachedSession() // Fetch or retrieve cached session
        console.log(session ?? "no session")
        if (session && config.url !== "/.netlify/functions/getlist") {
            config.headers["Authorization"] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Njg0NDNhNzJiZTNkNGMyY2E3Njc4NSIsInBob25lIjoiMDMyNjkwNTQwMCIsImlhdCI6MTczNTAwNzcyMH0.Tkd0iCyAk8wn0XvNBfy-d6EMkd6KFKemYrtVHb8t_HU'
            // `Bearer ${session.user.access_token}`
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