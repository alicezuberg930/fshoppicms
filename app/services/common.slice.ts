import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface LoadingState {
    isLoading: boolean,
}

const initialState: LoadingState = {
    isLoading: false,
}
export const commonSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoadingOverlay: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    }
})

export const { setIsLoadingOverlay } = commonSlice.actions
export const commonSliceReducer = commonSlice.reducer