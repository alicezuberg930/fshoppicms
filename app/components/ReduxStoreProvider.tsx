"use client"
import { store, persistor } from "@/app/configs/store.config"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

const ReduxStoreProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default ReduxStoreProvider