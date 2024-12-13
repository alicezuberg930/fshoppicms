import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { API } from "@/app/common/api"
import { createCategory, deleteCategory, getCategories } from "../services/api.service"
import { isAxiosError } from "@/app/common/utils"
import { toast } from "react-toastify"

export const readCategoryHook = (page: number) => {
    const { data } = useSession()
    return useQuery({
        queryKey: [API.READ_CATEGORIES, page],
        queryFn: () => getCategories(data?.user.access_token ?? ""),
        placeholderData: (previousData, previousQuery) => previousData,
    })
}

export const deleteCategoryHook = (page: number) => {
    const { data } = useSession()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteCategory(data?.user.access_token ?? "", id),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_CATEGORIES, page] })
        },
        onError(error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
    })
}

export const createCategoryHook = () => {
    const { data } = useSession()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: Category) => createCategory(data?.user.access_token ?? "", category),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_CATEGORIES, 1] })
        },
        onError(error) { if (isAxiosError(error)) toast.error(error.response?.data.error) },
    })
}