import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { createCategory, createSubCategory, deleteCategory, deleteSubCategory, getCategories, getSubCategories, updateCategory, updateSubCategory } from "../services/api.service"
import { isAxiosError } from "@/app/common/utils"
import { toast } from "react-toastify"

export const readCategoryHook = (page: number) => {
    return useQuery({
        queryKey: [API.READ_CATEGORIES, page],
        queryFn: () => getCategories(),
        placeholderData: (previousData, previousQuery) => previousData,
    })
}

export const deleteCategoryHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_CATEGORIES, page] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
    })
}

export const deleteSubCategoryHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteSubCategory(id),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_CATEGORIES, page] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
    })
}

export const createCategoryHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: Category) => category.parentCategory != null ? createSubCategory(category) : createCategory(category),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_CATEGORIES, 1] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.error)
        },
    })
}

export const updateCategoryHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ category, id, isSubcategory }: { category: Category, id: string, isSubcategory: boolean }) =>
            isSubcategory ? updateSubCategory(id, category) : updateCategory(id, category),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_CATEGORIES, 1] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.error)
        },
    })
}