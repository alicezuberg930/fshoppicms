import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import storageSession from "redux-persist/lib/storage/session";
import { sidebarReducer } from "../services/sidebar.slice";
import { dropDownReducer } from "../services/dropdown.slice";
import { commonSliceReducer } from "../services/common.slice";
import { useDispatch } from "react-redux";

const localPersistConfig = {
    key: "root",
    storage,
};

// const sessionPersistConfig = {
//     key: "login",
//     storage: storageSession,
// };

export const store = configureStore({
    reducer: {
        dropdown: persistReducer(localPersistConfig, dropDownReducer),
        sidebar: persistReducer(localPersistConfig, sidebarReducer),
        common: persistReducer(localPersistConfig, commonSliceReducer)
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
    }),
})
export const persistor = persistStore(store);
// export type PersistorState = ReturnType<typeof persistor.getState>
// export type AppDispatch = typeof persistor.dispatch