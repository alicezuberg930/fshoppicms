"use client"
import CustomImagePicker from "@/app/components/CustomImagePicker"
import LoadingOverlay from "@/app/components/LoadingOverlay"
import { uploadFilesHook } from "@/app/hooks/common.hooks"
import { setIsLoadingOverlay } from "@/app/services/common.slice"
import { useState } from "react"
import { useDispatch } from "react-redux"

const UploadFilesPage: React.FC = () => {
    const [files, setFiles] = useState<File[]>([])
    const mutate = uploadFilesHook()
    const [imageLinks, setImageLinks] = useState<string[]>([])
    const dispatch = useDispatch()

    const handleUploadFiles = async () => {
        let tempLinks: string[] = []
        if (files.length > 0) {
            dispatch(setIsLoadingOverlay(true))
            const form = new FormData();
            for (const file of files) {
                form.set("file", file);
                await new Promise((resolve) => {
                    mutate.mutate(form, {
                        onSuccess(data) {
                            tempLinks.push(data.url)
                            resolve(null);
                        }
                    });
                });
            }
            dispatch(setIsLoadingOverlay(false))
            if (tempLinks.length > 0) setImageLinks(tempLinks);
        }
    }

    return (
        <main className="h-full">
            <LoadingOverlay />
            <div className="py-5 px-2 md:px-6">
                <div className="flex items-center justify-between mb-2 text-2xl font-semibold">
                    <h2 className="text-black">Upload ảnh</h2>
                    <div className="flex gap-2">
                        {/* <Link href="/cms/users/create" className="flex items-center text-sm font-medium rounded-xl bg-blue-300 gap-1 text-white py-2 px-4">
                            <IoIosAddCircleOutline className="w-5 h-5" />
                            <span>Thêm mới</span>
                        </Link>
                        <button className="flex items-center text-sm font-medium rounded-xl bg-red-600 gap-1 text-white py-2 px-4">
                            <FaRegTrashAlt className="w-5 h-5" />
                            <span>Xóa</span>
                        </button> */}
                    </div>
                </div>
                <div className="flex-col text-black">
                    <div className="space-y-4">
                        <CustomImagePicker setImages={setFiles} isMultiple={true} />
                        <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' onClick={handleUploadFiles} />
                        {
                            imageLinks.length > 0 ? <div className="">
                                <span className="font-bold text-lg">Link ảnh của bạn</span>
                                {
                                    imageLinks.map(link => {
                                        return (
                                            <div key={link}>
                                                <a href={link} target="_blank">{link}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div> : <></>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default UploadFilesPage