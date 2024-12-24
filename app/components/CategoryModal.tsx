"use client"
import React, { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import CustomImagePicker from "@/app/components/CustomImagePicker"
import { createCategoryHook, readCategoryHook, updateCategoryHook } from "../hooks/category.hooks"
import { uploadFilesHook } from "../hooks/common.hooks"
import CategorySelectList from "./CategorySelectList"

const CategoryModal: React.FC<{
    selectedCategory?: Category, setSelected?: (v: Category | null) => void, page: number
}> = ({ selectedCategory, setSelected, page }) => {
    const [images, setImages] = useState<File[]>([])
    const { data: categories, isLoading } = readCategoryHook(1)
    const create = createCategoryHook()
    const update = updateCategoryHook()
    const uploadHook = uploadFilesHook()

    const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (images.length < 1) {
            toast.error("Cần ít nhất 1 ảnh cho danh mục")
            return
        }
        const formData = new FormData(e.currentTarget)
        const category: Category = Object.fromEntries(formData.entries())
        if (category.parentCategory == "") category.parentCategory = null
        uploadHook.mutate(formData, {
            onSuccess(data) {
                category["thumbnail"] = data.url
                if (selectedCategory == null) {
                    create.mutate(category)
                } else {
                    update.mutate({ category: category, id: selectedCategory._id! })
                }
            }
        })
    }


    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{selectedCategory ? 'Sửa' : 'Thêm'} danh mục</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleCreateCategory}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin danh mục</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên danh mục<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedCategory?.name ?? ""} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' autoComplete='off' name="name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Mô tả<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <textarea defaultValue={selectedCategory?.description ?? ""} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={6} autoComplete='off' name="description" />
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
                                    <td className='py-3 w-32'>Danh mục cha<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name="parentCategory">
                                            <option value="" className="text-lg">Không chọn</option>
                                            {
                                                isLoading ?
                                                    <option value="" disabled>Không có dữ liệu</option> :
                                                    categories?.categories && <CategorySelectList categories={categories?.categories.data.categories as Category[]} currentPage={1} />
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
                                            {selectedCategory ? <button onClick={() => setSelected!(null)} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button> : <></>}
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

export default CategoryModal