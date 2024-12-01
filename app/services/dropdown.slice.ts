import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface DropDownState {
    isOrder: boolean,
    isProduct: boolean,
    isConfig: boolean
}

const initialState: DropDownState = {
    isOrder: false,
    isProduct: false,
    isConfig: false
}
export const sidebarSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        setOrderDropDown: (state, action: PayloadAction<boolean>) => {
            state.isOrder = action.payload
        },
        setProductDropDown: (state, action: PayloadAction<boolean>) => {
            state.isProduct = action.payload
        },
        setConfigDropDown: (state, action: PayloadAction<boolean>) => {
            state.isConfig = action.payload
        },
    }
})

export const { setOrderDropDown, setProductDropDown, setConfigDropDown } = sidebarSlice.actions
export const dropDownReducer = sidebarSlice.reducer