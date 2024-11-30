import { configureStore } from "@reduxjs/toolkit"
import { loginReducer } from "./loginSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

export const store = configureStore({
    reducer: {
        login: persistReducer(persistConfig, loginReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
})
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof persistor.getState>
export type AppDispatch = typeof persistor.dispatch

// const persistedReducer = persistReducer(persistConfig, loginReducer)

// const storee = configureStore({
//   reducer: persistedReducer
// })
