"use client"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import CustomImagePicker from "@/app/components/CustomImagePicker"
import { createCategoryHook, readCategoryHook } from "../hooks/category.hooks"
import { uploadFilesHook } from "../hooks/common.hooks"

const CategoryPageComponent: React.FC = () => {
    const [images, setImages] = useState<File[]>([])
    const { data: categories, isLoading } = readCategoryHook(1)
    const mutation = createCategoryHook()
    const uploadHook = uploadFilesHook()

    const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (images.length < 1) {
            toast.error("Cần ít nhất 1 ảnh cho danh mục")
            return
        }
        const formData = new FormData(e.currentTarget);
        const category: Category = Object.fromEntries(formData.entries()); // Convert FormData to an object
        uploadHook.mutate(formData, {
            onSuccess(data) {
                category["thumnail"] = data.url
                mutation.mutate(category)
            }
        })
    }

    return (
        <div className='w-full'>
            <div className=''>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>Thêm danh mục</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={(e) => handleCreateCategory(e)}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2} className='bg-primary'>&nbsp;</td>
                                    <td className='py-3 font-bold text-sm'>Thông tin danh mục</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên danh mục<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Mô tả<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <textarea className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={6} required autoComplete='off' name="description" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Hình</td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} isMultiple={false} />
                                        </div>
                                        <p className='mb-0 text-red-500 text-sm'><b>Kích thước ảnh:</b> 700 x 700 (px)</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Danh mục cha<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name="parentCategory">
                                            {
                                                !isLoading ?
                                                    (categories.data.categories as Category[])?.map(v => {
                                                        return (
                                                            <option key={v._id} value={v._id}>{v.name}</option>
                                                        )
                                                    }) :
                                                    <option value="" disabled>Không có dữ liệu</option>
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CategoryPageComponent