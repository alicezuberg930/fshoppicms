"use client"
import { store, persistor } from "@/app/services/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

const CustomProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default CustomProvider