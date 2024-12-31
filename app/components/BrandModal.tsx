import React, { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { readCategoryHook } from "../hooks/category.hooks"
import { createBrandHook, updateBrandHook } from "../hooks/brands.hooks"
import { uploadFilesHook } from "../hooks/common.hooks"
import { toast } from "react-toastify"
import CustomImagePicker from "./CustomImagePicker"

const BrandModal: React.FC<{ selectedBrand?: Brand, setSelected?: Dispatch<SetStateAction<Brand | null>> }> = ({ selectedBrand, setSelected }) => {
    const [images, setImages] = useState<File[]>([])
    const { data: categories, isLoading: loadingCategories } = readCategoryHook(1)
    const create = createBrandHook()
    const update = updateBrandHook()
    const uploadHook = uploadFilesHook()

    const handleBrand = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (images.length < 1) {
            toast.error("Cần ít nhất 1 ảnh cho thương hiệu")
            return
        }
        const formData = new FormData(e.currentTarget)
        const brand: Brand = Object.fromEntries(formData.entries()) // Convert FormData to an object
        brand["categories"] = [formData.get("category")!.toString()]
        formData.set('file', images[0])
        uploadHook.mutate(formData, {
            onSuccess(data) {
                brand["logo"] = data.url
                if (selectedBrand != null) {
                    // nếu đã chọn thương hiệu -> cập nhật
                    update.mutate({ id: selectedBrand._id!, brand: brand })
                } else {
                    // không chọn thương hiệu đã chọn -> tạo mới
                    create.mutate(brand)
                }
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
                    <form onSubmit={handleBrand}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin thương hiệu</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên thương hiệu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedBrand?.name} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Hình</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} isMultiple={false} id="brand" />
                                        </div>
                                        <p className='mb-0 text-red-500 text-sm'><b>Kích thước ảnh:</b> 700 x 700 (px)</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Danh mục<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name="category">
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
                                            {selectedBrand ? <button onClick={() => setSelected!(null)} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button> : <></>}
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

export default BrandModal