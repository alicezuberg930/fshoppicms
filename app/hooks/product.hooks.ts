import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/api.service"
import { API } from "@/app/common/api"
import { toast } from "react-toastify"
import { isAxiosError } from "@/app/common/utils"

export const deleteProductHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_PRODUCTS, page] })
        }
    })
}

export const readProductsHook = (page: number) => {
    return useQuery({
        queryKey: [API.READ_PRODUCTS, page],
        queryFn: () => getProducts({ page }),
        placeholderData: (previousData, previousQuery) => previousData,
    })
}

export const createProductHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ body }: { body: Product }) => createProduct(body),
        onSuccess(data) {
            // toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_PRODUCTS, page] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(JSON.parse(error.response?.data))
        },
    })
}

export const updateProductHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ body, id }: { body: Product, id: string }) => updateProduct(id, body),
        onSuccess(data) {
            // toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_PRODUCTS, page] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(JSON.parse(error.response?.data))
        },
    })
}

