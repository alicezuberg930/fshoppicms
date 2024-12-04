"use client"
import { useEffect, useState } from "react"
import { createCategory, getCategories, uploadFile } from "../services/api"
import { toast } from "react-toastify"
import axios from "axios"
import { useSession } from "next-auth/react"
import CustomImagePicker from "@/app/components/CustomImagePicker"

const CategoryPageComponent: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    // const [thumbnail, setThumbnail] = useState<string>("")
    const [parentCategory, setParentCategory] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const { data, status } = useSession();
    const [images, setImages] = useState<File[]>([])

    const getCategoriesAction = async () => {
        try {
            const response = await getCategories(data?.user.access_token ?? "");
            if (response.data?.status === "OK") {
                setCategories(response.data.data.categories as Category[])
            } else {
                toast.error(response.data)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data.error)
            }
        }
    }

    useEffect(() => {
        getCategoriesAction()
    }, [status])

    const createCategoryAction = async () => {
        if (images.length < 1) {
            toast.error("Cần ít nhất 1 ảnh cho danh mục")
            return
        }
        const form = new FormData()
        let imageLink: string = ""
        form.set("file", images[0])
        try {
            const response = await uploadFile(data?.user.access_token ?? "", form)
            if (response?.data.status === "OK") {
                imageLink = response.data.url
            } else {
                toast.error(response.data.error)
                return
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data.error)
                return
            }
        }

        const category: Category = {
            name: name,
            description: description,
            thumnail: imageLink,
            parentCategory: parentCategory,
        }
        try {
            const response = await createCategory(data?.user.access_token ?? "", category)
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
                                            <select onChange={(e) => setParentCategory(e.target.value)} className='border-gray-300 p-2 border rounded-md w-full outline-none'>
                                                {
                                                    categories.length > 0 ?
                                                        categories?.map(v => {
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