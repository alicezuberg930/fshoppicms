import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface CategoryState {
    selectedCategory: Category | null,
}

const initialState: CategoryState = {
    selectedCategory: null
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
            state.selectedCategory = action.payload
        }
    }
})

export const { setSelectedCategory } = categorySlice.actions
export const categoryReducer = categorySlice.reducer