"use client"
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { toast } from "react-toastify"
import CustomImagePicker from "@/app/components/CustomImagePicker"
import { createCategoryHook, readCategoryHook, updateCategoryHook } from "../hooks/category.hooks"
import { uploadFilesHook } from "../hooks/common.hooks"
import CategorySelectList from "./CategorySelectList"
import { icons } from "../common/icons"
import { useDispatch, useSelector } from "react-redux"
import { getSubCategories } from "../services/api.service"
import { setSubCategories } from "../services/subcategories.slice"

const CategoryModal: React.FC<{
    selectedCategory?: Category, setShow?: (v: boolean) => void, page: number, show?: boolean, setSelected: Dispatch<SetStateAction<Category | null>>
}> = ({ selectedCategory, setShow, page, show = false, setSelected }) => {
    const [images, setImages] = useState<File[]>([])
    const { data: categories, isLoading } = readCategoryHook(1)
    const create = createCategoryHook()
    const update = updateCategoryHook()
    const uploadHook = uploadFilesHook()
    const { MdCancel } = icons
    const { subCategories, currentParentCategory } = useSelector((state: any) => state.subcategory)
    const dispatch = useDispatch()

    const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (images.length < 1) {
            toast.error("Cần ít nhất 1 ảnh cho danh mục")
            return
        }
        const formData = new FormData(e.currentTarget)
        const category: Category = Object.fromEntries(formData.entries())
        if (category.parentCategory == "") category.parentCategory = null
        formData.set("file", images[0])
        uploadHook.mutate(formData, {
            onSuccess(data) {
                category["thumbnail"] = data.url
                if (selectedCategory == null) {
                    create.mutate(category)
                } else {
                    const isSubcategory = subCategories.find((v: Category) => v._id === selectedCategory._id) !== undefined
                    update.mutate({ category: category, id: selectedCategory._id!, isSubcategory })
                    if (isSubcategory)
                        getSubCategories(currentParentCategory!).then(res => { dispatch(setSubCategories(res.category.data)) })
                }
                setShow!(false)
            }
        })
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3 flex justify-between items-center'>
                    <h3 className='font-semibold text-red-500'>{selectedCategory ? 'Sửa' : 'Thêm'} danh mục</h3>
                    <MdCancel size={28} fill="red" onClick={() => { setShow!(false); setSelected(null) }} />
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
                                    <td className='py-3 w-32'>Mô tả</td>
                                    <td className='py-3'>
                                        <textarea defaultValue={selectedCategory?.description ?? ""} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={6} autoComplete='off' name="description" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Hình</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} isMultiple={false} id="category" />
                                        </div>
                                        <p className='mb-0 text-red-500 text-sm'><b>Kích thước ảnh:</b> 700 x 700 (px)</p>
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
                                            <button onClick={() => { setShow!(false); setSelected(null); }} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button>
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