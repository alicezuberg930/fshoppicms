import { configureStore } from "@reduxjs/toolkit"
import { counterReducer } from "@/app/slice"
import { api } from "./services/api"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch