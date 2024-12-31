import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/api.service"
import { API } from "@/app/common/api"
import { toast } from "react-toastify"
import { isAxiosError } from "@/app/common/utils"
import { useDispatch } from "react-redux"
import { setIsLoadingOverlay } from "../services/common.slice"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"

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
        placeholderData: (previousData, _) => previousData,
    })
}

export const createProductHook = (page: number) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ body }: { body: Product }) => createProduct(body),
        onSuccess(_) {
            toast.success('Thêm sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: [API.READ_PRODUCTS, page] })
            router.push(PATH.PRODUCT_LIST)
        },
        onError(error) {
            dispatch(setIsLoadingOverlay(false))
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(JSON.parse(error.response?.data))
        },
    })
}

export const updateProductHook = (page: number) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ body, id }: { body: Product, id: string }) => updateProduct(id, body),
        onSuccess(_) {
            toast.success('Sửa sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: [API.READ_PRODUCTS, page] })
            router.push(PATH.PRODUCT_LIST)
        },
        onError(error) {
            dispatch(setIsLoadingOverlay(false))
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(JSON.parse(error.response?.data))
        },
    })
}

