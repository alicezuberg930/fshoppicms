import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, getUsers, lockAccount, unlockAccount } from "../services/api.service"
import { isAxiosError } from "../common/utils"
import { toast } from "react-toastify"
import { API } from "../common/api"

export const createUserHook = () => {
    return useMutation({
        mutationFn: ({ user }: { user: User }) => createUser(user),
        onError(error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message ?? error.response?.data.error)
        },
        onSuccess(data) { toast.success(data.message) }
    })
}

export const handleUserHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, type }: { id: string, type: string }) => type === "lock" ? lockAccount(id) : unlockAccount(id),
        onError(error) { if (isAxiosError(error)) toast.error(error.response?.data.error) },
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.READ_USERS, page] })
        },
    })
}

export const readUserHook = (page: number) => {
    return useQuery({
        queryKey: [API.READ_USERS, page],
        queryFn: () => getUsers({ page }),
        placeholderData: (previousData, previousQuery) => previousData,
    })
}