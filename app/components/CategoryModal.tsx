"use client"
import React, { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CustomImagePicker from "@/app/components/CustomImagePicker"
import { createCategoryHook, readCategoryHook, updateCategoryHook } from "../hooks/category.hooks"
import { uploadFilesHook } from "../hooks/common.hooks"
import CategorySelectList from "./CategorySelectList"
import { useDispatch, useSelector } from "react-redux"
import { getSubCategories } from "../services/api.service"
import { setSubCategories } from "../services/subcategories.slice"

const CategoryModal: React.FC<{ page: number }> = ({ page }) => {
    const { selectedCategory } = useSelector((state: any) => state.category)
    const [images, setImages] = useState<{ file: File | null, url: string }[]>([])
    const { data: categories, isLoading } = readCategoryHook(page)
    const createHook = createCategoryHook(page)
    const updateHook = updateCategoryHook(page)
    const uploadHook = uploadFilesHook()
    const { subCategories, currentParentCategory } = useSelector((state: any) => state.subcategory)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedCategory && selectedCategory.thumbnail) setImages([{ file: null, url: selectedCategory.thumbnail }])
    }, [])

    const handleCategoryAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (images.length < 1) {
            toast.error("Cần ít nhất 1 ảnh cho danh mục")
            return
        }
        const formData = new FormData(e.currentTarget)
        const tempCategory: Category = Object.fromEntries(formData.entries())
        if (tempCategory.parentCategory == "") tempCategory.parentCategory = null
        if (images[0].file != null) {
            formData.set("file", images[0].file!)
            await new Promise(resolve => {
                uploadHook.mutate(formData, {
                    onSuccess(data) {
                        tempCategory["thumbnail"] = data.url
                        resolve(null)
                    }
                })
            })
        } else {
            tempCategory["thumbnail"] = images[0].url
        }
        if (selectedCategory) {
            const isSubcategory = subCategories.find((v: Category) => v._id === selectedCategory._id) !== undefined
            updateHook.mutate({ category: tempCategory, id: selectedCategory._id!, isSubcategory })
            if (isSubcategory) getSubCategories(currentParentCategory!).then(res => { dispatch(setSubCategories(res.category.data)) })
        } else {
            createHook.mutate(tempCategory)
        }
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3 flex justify-between items-center'>
                    <h3 className='font-semibold text-red-500'>{selectedCategory ? 'Sửa' : 'Thêm'} danh mục</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleCategoryAction}>
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
                                    <td className='py-3 w-32'>Mô tả</td>
                                    <td className='py-3'>
                                        <textarea defaultValue={selectedCategory?.description ?? ""} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={6} autoComplete='off' name="description" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Hình</td>
                                    <td className='py-3'>
                                        <CustomImagePicker setImages={setImages} images={images} isMultiple={false} id="category" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Danh mục cha<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue={selectedCategory?.parentCategory ?? ""} className='border-gray-300 p-2 border rounded-md w-full outline-none' name="parentCategory">
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
                                            <button className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default CategoryModal