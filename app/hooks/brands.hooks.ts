import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { createBrand, deleteBrand, getBrands } from "../services/api.service"
import { isAxiosError } from "@/app/common/utils"
import { toast } from "react-toastify"

export const readBrandsHook = (page: number) => {
    return useQuery({
        queryKey: [API.READ_BRANDS, page],
        queryFn: () => getBrands(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const deleteBrandHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteBrand(id),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_BRANDS, page] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
    })
}

export const createBrandHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (brand: Brand) => createBrand(brand),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_BRANDS] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.error)
        },
    })
}