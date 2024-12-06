import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/api"
import { useSession } from "next-auth/react"
import { API } from "@/app/common/api"
import { toast } from "react-toastify"
import { isAxiosError } from "@/app/common/utils"

export const deleteProductHook = (page: number) => {
    const { data } = useSession()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteProduct(data?.user.access_token ?? "", id),
        onError(error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
        onSuccess(data) {
            toast.success(data.data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_PRODUCTS, page] })
        },
    })
}

export const readProductsHook = (page: number) => {
    const { data } = useSession()
    return useQuery({
        queryKey: [API.READ_PRODUCTS, page],
        queryFn: () => getProducts(data?.user.access_token ?? "", { page }),
        staleTime: 2000 * 1000,
        placeholderData: (previousData, previousQuery) => previousData,
    })
}

export const updateProductHook = (page: number) => {
    const { data } = useSession()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ body, product }: { body: Product, product: Product | null }) => product != null ? updateProduct(data?.user.access_token ?? "", product!._id!, body) : createProduct(data?.user.access_token ?? "", body),
        onSuccess(data) {
            toast.success(data.data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_PRODUCTS, page] })
        },
        onError(error) { if (isAxiosError(error)) toast.error(error.response?.data.message) },
    })
}

