import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface SubCategoryState {
    subCategories: Category[],
    currentParentCategory: string,
}

const initialState: SubCategoryState = {
    subCategories: [],
    currentParentCategory: ""
}
export const subcategoriesSlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {
        setSubCategories: (state, action: PayloadAction<Category[]>) => {
            state.subCategories = action.payload
        },
        setCurrentParentCategory: (state, action: PayloadAction<string>) => {
            state.currentParentCategory = action.payload
        }
    }
})

export const { setSubCategories, setCurrentParentCategory } = subcategoriesSlice.actions
export const subcategoriesReducer = subcategoriesSlice.reducer