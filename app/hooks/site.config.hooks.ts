import { useMutation, useQuery } from "@tanstack/react-query"
import { getSiteConfigs, updateSiteConfigs } from "../services/api.service"
import { API } from "@/app/common/api"
import { toast } from "react-toastify"
import { isAxiosError } from "@/app/common/utils"

export const readSiteConfigsHook = () => {
    return useQuery({
        queryKey: ["dd"],
        queryFn: () => getSiteConfigs(),
    })
}

export const updateSiteConfigsHook = () => {
    return useMutation({
        mutationFn: (config: Config) => updateSiteConfigs(config),
        onSuccess(data) {
            toast.success(data.message)
        },
        onError(error) { if (isAxiosError(error)) toast.error(JSON.stringify(error.response?.data.message)) },
    })
}

