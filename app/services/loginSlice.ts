import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface TokenState {
    token: string
}

const initialState: TokenState = {
    token: ""
}
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        saveToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const { saveToken } = loginSlice.actions
export const loginReducer = loginSlice.reducer