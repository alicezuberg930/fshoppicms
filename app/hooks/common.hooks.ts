import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/app/services/api.service";
import { isAxiosError } from "@/app/common/utils";
import { toast } from "react-toastify";

export const uploadFilesHook = () => {
    return useMutation({
        mutationFn: (formData: FormData) => uploadFile(formData),
        onError(error) { if (isAxiosError(error)) toast.error(error?.response?.data.error) },
    })
}