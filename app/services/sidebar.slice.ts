import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export interface SidebarState {
    isCollapsed: boolean
}

const initialState: SidebarState = {
    isCollapsed: false
}
export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setCollapseSidebar: (state, action: PayloadAction<boolean>) => {
            state.isCollapsed = action.payload
        }
    }
})

export const { setCollapseSidebar } = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer