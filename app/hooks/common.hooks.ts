import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/app/services/api.service";
import { isAxiosError } from "@/app/common/utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setIsLoadingOverlay } from "../services/common.slice";

export const uploadFilesHook = () => {
    const dispatch = useDispatch()
    return useMutation({
        mutationFn: (formData: FormData) => uploadFile(formData),
        onError(error) {
            dispatch(dispatch(setIsLoadingOverlay(false)))
            if (isAxiosError(error)) toast.error(error?.response?.data.error)
        },
    })
}