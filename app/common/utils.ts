import axios, { AxiosError } from "axios"

export const isAxiosError = (error: unknown) => {
    return axios.isAxiosError(error)
}