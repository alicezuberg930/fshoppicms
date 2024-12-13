import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, getUsers, lockAccount, unlockAccount } from "../services/api.service"
import { isAxiosError } from "../common/utils"
import { toast } from "react-toastify"
import { API } from "../common/api"
import { useSession } from "next-auth/react"

export const createUserHook = () => {
    const { data } = useSession()
    return useMutation({
        mutationFn: ({ user }: { user: User }) => createUser(data?.user.access_token ?? "", user),
        onError(error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message ?? error.response?.data.error)
        },
        onSuccess(data) { toast.success(data.message) }
    })
}

export const handleUserHook = (page: number) => {
    const queryClient = useQueryClient()
    const { data } = useSession()
    return useMutation({
        mutationFn: ({ id, type }: { id: string, type: string }) => type === "lock" ? lockAccount(data?.user.access_token ?? "", id) : unlockAccount(data?.user.access_token ?? "", id),
        onError(error) { if (isAxiosError(error)) toast.error(error.response?.data.error) },
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_USERS, page] })
        },
    })
}

export const readUserHook = (page: number) => {
    const { data } = useSession()
    return useQuery({
        queryKey: [API.READ_USERS, page],
        queryFn: () => getUsers(data?.user.access_token ?? "", { page }),
        placeholderData: (previousData, previousQuery) => previousData,
    })
}