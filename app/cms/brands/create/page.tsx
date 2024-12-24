// {
//     "name": "GALAXY",
//         "logo": "https://example.com/nike-logo.png",
//             "categories": ["676061ac75dc005144fb68c8"]
// }

import CategorySelectList from "@/app/components/CategorySelectList"
import CustomImagePicker from "@/app/components/CustomImagePicker"
import { createBrandHook } from "@/app/hooks/brands.hooks"
import { readCategoryHook } from "@/app/hooks/category.hooks"
import { uploadFilesHook } from "@/app/hooks/common.hooks"
import React, { FormEvent, useState } from "react"
import { toast } from "react-toastify"

const CreateBrandPage: React.FC = () => {
    const [images, setImages] = useState<File[]>([])
    const { data: categories, isLoading: loadingCategories } = readCategoryHook(1)
    const mutation = createBrandHook()
    const uploadHook = uploadFilesHook()

    const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (images.length < 1) {
            toast.error("Cần ít nhất 1 ảnh cho thương hiệu")
            return
        }
        const formData = new FormData(e.currentTarget)
        const brand: Brand = Object.fromEntries(formData.entries()) // Convert FormData to an object
        // if (brand.parentCategory == "") brand.parentCategory = null
        uploadHook.mutate(formData, {
            onSuccess(data) {
                brand["logo"] = data.url
                mutation.mutate(brand)
            }
        })
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>Thêm danh mục</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleCreateCategory}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin thương hiệu</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên thương hiệu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Hình</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} isMultiple={false} />
                                        </div>
                                        <p className='mb-0 text-red-500 text-sm'><b>Kích thước ảnh:</b> 700 x 700 (px)</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Danh mục<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name="parentCategory">
                                            {loadingCategories ?
                                                <option value="" disabled>Không có dữ liệu</option> :
                                                categories?.categories && (categories?.categories?.data.categories as Category[]).map(category => {
                                                    return (
                                                        <option className={`text-lg`} key={category._id} value={category._id}>{category.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
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