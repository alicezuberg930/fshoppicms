import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/app/services/api";
import { isAxiosError } from "@/app/common/utils";
import { toast } from "react-toastify";

export const uploadFilesHook = () => {
    const { data } = useSession()
    return useMutation({
        mutationFn: (formData: FormData) => uploadFile(data?.user.access_token ?? "", formData),
        onError(error) { if (isAxiosError(error)) toast.error(error?.response?.data.error) },
    })
}