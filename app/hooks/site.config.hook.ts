import { useMutation, useQuery } from "@tanstack/react-query"
import { getSiteConfigs, updateSiteConfigs } from "../services/api.service"
import { useSession } from "next-auth/react"
import { API } from "@/app/common/api"
import { toast } from "react-toastify"
import { isAxiosError } from "@/app/common/utils"

export const readSiteConfigsHook = () => {
    const { data } = useSession()
    return useQuery({
        queryKey: ["dd"],
        queryFn: () => getSiteConfigs(data?.user.access_token ?? ""),
    })
}

export const updateSiteConfigsHook = () => {
    const { data } = useSession()
    return useMutation({
        mutationFn: (config: Config) => updateSiteConfigs(data?.user.access_token ?? "", config),
        onSuccess(data) {
            toast.success(data.message)
        },
        onError(error) { if (isAxiosError(error)) toast.error(JSON.stringify(error.response?.data.message)) },
    })
}

