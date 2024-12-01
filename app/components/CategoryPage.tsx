"use client"
import { useState } from "react"
import { createCategory } from "../services/api"
import { toast } from "react-toastify"
import axios from "axios"
import { useSelector } from 'react-redux';

const CategoryPageComponent: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [thumbnail, setThumbnail] = useState<string>("")
    const [parentCategory, setParentCategory] = useState<string | null>(null)
    const { token } = useSelector((state: any) => state.login)

    const createCategoryAction = async () => {
        const category: Category = {
            name: name,
            description: description,
            thumnail: thumbnail,
            parentCategory: parentCategory == "" ? null : parentCategory,
        }
        try {
            const response = await createCategory(token, category)
            if (response?.data.status === "OK") {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data.error)
            }
        }
    }

    return (
        <>
            <div className='w-full'>
                <div className=''>
                    <div className='bg-[#f5f5f5] p-3'>
                        <h3 className='font-semibold text-red-500'>Thêm danh mục</h3>
                    </div>
                    <div className='p-3'>
                        <form onSubmit={(e) => e.preventDefault()}>
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
                                            <input onChange={(e) => setName(e.target.value)} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 w-32'>Mô tả<b className='text-red-500'>*</b></td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <textarea onChange={(e) => setDescription(e.target.value)} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={6} required autoComplete='off' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 w-32'>Ảnh<b className='text-red-500'>*</b></td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <input onChange={(e) => setThumbnail(e.target.value)} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' autoComplete='off' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 w-32'>Danh mục cha<b className='text-red-500'>*</b></td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <input onChange={(e) => setParentCategory(e.target.value)} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' autoComplete='off' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>&nbsp;</td>
                                        <td>
                                            <div className='space-x-3 font-bold text-md'>
                                                <input type='submit' onClick={() => createCategoryAction()} className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
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
        </>
    )
}

export default CategoryPageComponent