"use client"
import { store } from "@/app/store"
import { Provider } from "react-redux"

const CustomProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>{children}</Provider>
    )
}

export default CustomProvider