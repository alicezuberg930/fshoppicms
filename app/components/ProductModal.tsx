'use client'
// import dynamic from 'next/dynamic'
// const CustomCKEditor = dynamic(() => import('@/app/components/CustomCKEditor'), {
//     ssr: false // Prevents Editor.js from being included in server-side rendering
// })
import CustomImagePicker from '@/app/components/CustomImagePicker'
import React, { FormEvent, useState } from 'react'
import { icons } from '@/app/common/icons'
import { uploadFile } from '@/app/services/api.service'
import { toast } from 'react-toastify'
import axios from 'axios'
import { updateProductHook } from '../hooks/product.hooks'
import { readBrandsHook } from '../hooks/brands.hooks'
import CategoryModalPicker from './CategoryModalPicker'

const ProductModal: React.FC<{ product?: Product, page: number }> = ({ product = null, page }) => {
    const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<File[]>([])
    const { FaRegTrashAlt, MdOutlineCancel, IoIosAddCircleOutline } = icons
    const [resetAll, setResetAll] = useState<boolean>(false)
    const mutation = updateProductHook(page)
    const { data: brands, isLoading: loadingBrands } = readBrandsHook(1)
    const [variations, setVariations] = useState<number[]>([0])
    const [options, setOptions] = useState<number[][]>([[0]])

    const handleProduct = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const currentTarget = e.currentTarget
        const formData = new FormData(currentTarget)
        let imageLinks: string[] = []
        if (product?.images != null && product?.images.length > 0 && images.length == 0) imageLinks = product.images
        if ((images.length < 1 && images.length > 10) && product == null) {
            toast.error('Cần ít nhất 1 ảnh và không hơn 10 ảnh')
            return
        }
        if (images.length > 0) {
            const form = new FormData()
            for (let i = 0; i < images.length; i++) {
                try {
                    form.set('file', images[i])
                    const response = await uploadFile(form)
                    if (response?.status === 'OK') {
                        imageLinks.push(response.url)
                    } else {
                        toast.error(response.error)
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        toast.error(error?.response?.data.error)
                    }
                }
            }
        }
        formData.delete('file')
        // let subs = subCategories.map(sub => sub._id!)
        const tempProduct: Product = Object.fromEntries(formData.entries())
        tempProduct['description'] = description || product?.description
        tempProduct['images'] = imageLinks
        tempProduct['options'] = getAllVariations()
        // tempProduct['childrenCategories'] = subs || []
        mutation!.mutate({ body: tempProduct, product }, {
            onSuccess(data) {
                toast.success(data.message)
                currentTarget.reset()
                setImages([])
                setResetAll(true)
                setDescription('')
                // setVariantElements([0])
            }
        })
    }

    const getAllVariations = (): Variant[] => {
        const variationElements = document.querySelectorAll('.variation-item')
        let attributes: any[] = []
        const variations: Variant[] = []
        variationElements.forEach(variation => {
            let variationNameInput = variation.querySelector('.variation-name-input') as HTMLInputElement
            let optionElements = variation.querySelectorAll('.option-name-input') as NodeListOf<HTMLInputElement>
            optionElements.forEach(option => {
                attributes.push({ val: option.value })
            })
            variations.push({ key: variationNameInput.value, value: attributes })
            attributes = []
        })
        console.log(variations)
        return variations
    }

    const applyAllOptions = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const entries = Object.fromEntries(formData.entries())
        const optionPriceInputs = document.querySelectorAll('.option-price-input') as NodeListOf<HTMLInputElement>
        const optionStockInputs = document.querySelectorAll('.option-stock-input') as NodeListOf<HTMLInputElement>
        const optionSKUInputs = document.querySelectorAll('.option-sku-input') as NodeListOf<HTMLInputElement>
        optionPriceInputs.forEach(v => v.value = String(entries.price))
        optionStockInputs.forEach(v => v.value = String(entries.stock))
        optionSKUInputs.forEach(v => v.value = String(entries.sku))
    }

    return (
        <div className='w-full py-4 max-w-[1440px] mx-auto'>
            {/* Menu */}
            <div className='bg-white mb-4 rounded-md overflow-hidden'>
                <div className='text-sm relative cursor-pointer'>
                    <div className='flex flex-wrap items-center h-14'>
                        <div className='px-4 hover:text-blue-500 active'>Thông tin cơ bản</div>
                        <div className='px-4 hover:text-blue-500'>Thông tin chi tiết</div>
                        <div className='px-4 hover:text-blue-500'>Thông tin bán hàng</div>
                        <div className='px-4 hover:text-blue-500'>Vận chuyển</div>
                        <div className='px-4 hover:text-blue-500'>Thông tin khác</div>
                    </div>
                    <div className='absolute left-0 bottom-0 w-[137px] h-[3px] bg-blue-500'></div>
                </div>
            </div>
            {/* Thông tin cơ bản */}
            <section className='overflow-hidden rounded-md bg-white mb-4 shadow-lime-950'>
                <div className='p-2 md:p-6 shadow-md'>
                    <div className='panel-header'>
                        <div className='text-xl font-semibold mb-10'>Thông tin cơ bản </div>
                    </div>
                    <div className='text-sm'>
                        <div className='panel-content'>
                            <div className=''>
                                {/* Hình ảnh */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Hình ảnh sản phẩm</span>
                                    </div>
                                    <div className=''>
                                        <div className='flex py-2'>
                                            <div className='flex'>
                                                <label className='mr-3 gap-3 flex items-center'>
                                                    <input type='radio' value='1' name='ratio' />
                                                    {/* <span className=''></span> */}
                                                    <span data-v-ba3e96bb='' className=''>Hình ảnh tỷ lệ 1:1</span>
                                                </label>
                                                <label className='mr-3 gap-3 flex items-center'>
                                                    <input type='radio' value='2' name='ratio' />
                                                    {/* <span className=''></span> */}
                                                    <span className=''>Hình ảnh tỷ lệ 3:4</span>
                                                </label>
                                            </div>
                                            <button type='button' className='text-blue-500'>
                                                <span>Xem ví dụ</span>
                                            </button>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <CustomImagePicker id='images' setImages={setImages} limit={9} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Ảnh bìa */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Ảnh bìa</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className=''>
                                            <CustomImagePicker id='banner' setImages={setImages} isMultiple={false} />
                                        </div>
                                        <div className='ml-6 text-xs text-gray-400'>
                                            <ul>
                                                <li className='list-disc'>Tải lên hình ảnh 1:1.</li>
                                                <li className='list-disc'>Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Video */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span>Video sản phẩm</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className=''>
                                            <CustomImagePicker id='video' setImages={setImages} />
                                        </div>
                                        <div className='ml-6 text-xs text-gray-400'>
                                            <ul>
                                                <li className='list-disc'>Kích thước tối đa 30Mb, độ phân giải không vượt quá 1280x1280px</li>
                                                <li className='list-disc'>Độ dài: 10s-60s</li>
                                                <li className='list-disc'>Định dạng: MP4</li>
                                                <li className='list-disc'>Lưu ý: sản phẩm có thể hiển thị trong khi video đang được xử lý. Video sẽ tự động hiển thị sau khi đã xử lý thành công.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Tên */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Tên sản phẩm</span>
                                    </div>
                                    <div className='w-full'>
                                        <div className=''>
                                            <input placeholder='Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật' type='text' name='name'
                                                className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Mã sản phẩm */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Mã sản phẩm</span>
                                    </div>
                                    <div className='w-full'>
                                        <div className=''>
                                            <input placeholder='Mã sản phẩm' type='text' name='productCode'
                                                className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Ngành hàng (danh mục) */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Ngành hàng</span>
                                    </div>
                                    <div className='w-full'>
                                        <CategoryModalPicker />
                                    </div>
                                </div>
                                {/* Description  */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Mô tả sản phẩm</span>
                                    </div>
                                    <div className='w-full'>
                                        <div className='product-description'>
                                            <div className=''>
                                                <textarea rows={9} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' />
                                                {/* <div className='text-area-label'>
                                                    <span className='text-area-label-pre'>0</span>
                                                    <span>3000</span>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Brand */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Thương hiệu</span>
                                    </div>
                                    <div className='w-full'>
                                        <div className=''>
                                            <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name='category'>
                                                {loadingBrands ?
                                                    <option value='' disabled>Không có dữ liệu</option> :
                                                    brands && (brands?.brands?.data as Brand[]).map(brand => {
                                                        return (
                                                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Thông tin bán hàng (biến thể) */}
            <section className='overflow-hidden rounded-md bg-white mb-4'>
                <div className='p-2 md:p-6 shadow-md'>
                    <div className='panel-header'>
                        <div className='text-xl font-semibold mb-10'>Thông tin bán hàng</div>
                    </div>
                    <div className='text-sm'>
                        <div className='panel-content'>
                            <div className=''>
                                {/* Phân loại hàng */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36'>
                                        <div className='flex justify-start md:justify-end gap-1 items-center'>
                                            <span className='relative flex w-2 h-2'>
                                                <div className='absolute w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping'></div>
                                                <div className='relative w-2 h-2 bg-blue-500 rounded-full'></div>
                                            </span>
                                            <span>Phân loại hàng</span>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        {/* Container chứa các biến thể */}
                                        <div className='variations-container'>
                                            {
                                                variations.map((variation, i) => {
                                                    return (
                                                        <div key={variation} className={`${i > 0 ? 'mt-4' : ''} rounded-md bg-gray-100 p-3 variation-item`}>
                                                            <div className='relative'>
                                                                <span className='absolute top-0 right-0'
                                                                    onClick={() => {
                                                                        setVariations(prev => prev.filter((_, j) => j !== i))
                                                                        setOptions(prev => prev.filter((_, j) => j !== i))
                                                                    }}
                                                                >
                                                                    <MdOutlineCancel size={24} />
                                                                </span>
                                                                <div className='flex flex-col sm:flex-row items-start sm:items-center pb-3'>
                                                                    <div className='flex-none w-20'>Phân loại {i + 1}</div>
                                                                    <div className='flex-1 w-full variation-name-edit'>
                                                                        <div className='w-full sm:w-1/2 flex'>
                                                                            <div className='flex-auto'>
                                                                                <input placeholder='e.g. Color, etc' type='text' className='variation-name-input border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' />
                                                                            </div>
                                                                            <div className='flex-none p-0 sm:pr-2 opacity-0'>
                                                                                <button className='pl-2'>
                                                                                    <IoIosAddCircleOutline size={16} />
                                                                                </button>
                                                                                <button className='pl-2'>
                                                                                    <IoIosAddCircleOutline size={16} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col sm:flex-row items-start sm:items-center'>
                                                                    <div className='flex-none w-20 pt-3'>Tùy chọn</div>
                                                                    <div className='flex-1 w-full variation-option-edit'>
                                                                        <div className='flex flex-wrap options-container'>
                                                                            {
                                                                                options[i]?.map((_, optionIndex) => {
                                                                                    return (
                                                                                        <div key={optionIndex} className='w-full sm:w-1/2 pt-3 pr-0 sm:odd:pr-2 flex items-center option-item drag-item' draggable>
                                                                                            <div className='flex-auto'>
                                                                                                <input placeholder='e.g. Red, etc' type='text' className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none option-name-input' />
                                                                                            </div>
                                                                                            <div className='h-4 flex-none'>
                                                                                                <button className='pl-2 text-gray-400' onClick={() => {
                                                                                                    setOptions(prev => {
                                                                                                        const newOptions = prev.map((option, index) => index === i ? [...option, option.length] : option)
                                                                                                        return newOptions
                                                                                                    })
                                                                                                }}>
                                                                                                    <IoIosAddCircleOutline size={16} />
                                                                                                </button>
                                                                                                <button className='pl-2 text-gray-400' onClick={() => {
                                                                                                    if (options[i].length > 1)
                                                                                                        setOptions(prev => {
                                                                                                            const newOptions = prev.map((option, index) => index === i ? option.filter((_, op) => op !== optionIndex) : option)
                                                                                                            return newOptions
                                                                                                        })
                                                                                                }}>
                                                                                                    <FaRegTrashAlt size={16} />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className={`${variations.length > 0 ? 'mt-4' : ''}`}>
                                            <button className='flex items-center text-blue-500 border-gray-300 p-2 border border-dashed rounded-md outline-none'
                                                onClick={() => {
                                                    setVariations([...variations, variations.length])
                                                    setOptions([...[...options], [0]])
                                                }}
                                            >
                                                <IoIosAddCircleOutline size={24} className='mr-2' />
                                                <span>Thêm nhóm phân loại</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Danh sách phân loại hàng */}
                                <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                        <span>Danh sách phân loại</span>
                                    </div>
                                    <div className='w-full'>
                                        <form className='flex flex-wrap gap-3' onSubmit={applyAllOptions}>
                                            <div className='flex items-center flex-auto'>
                                                <div className='flex-auto'>
                                                    <div className='eds-form-item__control'>
                                                        <div className='eds-form-item__content'>
                                                            <div className='eds-input price-input'>
                                                                <input placeholder='Giá' name='price' type='number' className='border-gray-300 p-2 border focus:border-blue-500 rounded-l-md w-full outline-none' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex-auto'>
                                                    <div className='eds-form-item__control'>
                                                        <div className='eds-form-item__content'>
                                                            <div className='eds-input'>
                                                                <input placeholder='Kho hàng' name='stock' type='number' className='border-gray-300 p-2 border focus:border-blue-500 w-full outline-none' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex-auto'>
                                                    <div className='eds-form-item__control'>
                                                        <div className='eds-form-item__content'>
                                                            <div className='eds-input'>
                                                                <input placeholder='SKU phân loại' name='sku' type='text' className='border-gray-300 p-2 border focus:border-blue-500 rounded-r-md w-full outline-none' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex-none'>
                                                <button className='rounded-md bg-blue-300 gap-1 text-white py-2 px-4'>
                                                    <span>Áp dụng cho tất cả phân loại</span>
                                                </button>
                                            </div>
                                        </form>
                                        {variations.length > 0 &&
                                            <div className='overflow-hidden rounded-md border border-gray-300 mt-5'>
                                                {
                                                    variations.map((_, i) => {
                                                        return (
                                                            <table key={i} className='w-full text-center'>
                                                                <thead className='bg-gray-100'>
                                                                    <tr>
                                                                        <th className='px-1 md:px-4 py-2 border-r border-gray-300 font-medium'>
                                                                            <div className='flex justify-center gap-1 items-center'>
                                                                                <span className='relative flex w-2 h-2'>
                                                                                    <div className='absolute w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping'></div>
                                                                                    <div className='relative w-2 h-2 bg-blue-500 rounded-full'></div>
                                                                                </span>
                                                                                <span>Phân loại {i + 1}</span>
                                                                            </div>
                                                                        </th>
                                                                        <th className='px-1 md:px-4 py-2 border-r border-gray-300 font-medium'>
                                                                            <div>
                                                                                <span className='text-red-500'>*</span>
                                                                                <span>Giá</span>
                                                                            </div>
                                                                        </th>
                                                                        <th className='px-1 md:px-4 py-2 border-r border-gray-300 font-medium'>
                                                                            <div>
                                                                                <span className='text-red-500'>*</span>
                                                                                <span>Kho hàng</span>
                                                                            </div>
                                                                        </th>
                                                                        <th className='px-1 md:px-4 py-2 font-medium'>
                                                                            <span>SKU Phân loại</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        options[i].map((_, optionIndex) => {
                                                                            return (
                                                                                <tr key={optionIndex} className='border-t border-gray-300'>
                                                                                    <td className='border-r py-3 flex flex-col items-center gap-2'>
                                                                                        <span>Tùy chọn {optionIndex + 1}</span>
                                                                                        <CustomImagePicker showTitle={false} setImages={setImages} id={`option-${i}`} isMultiple={false} />
                                                                                    </td>
                                                                                    <td className='border-r px-1 md:px-4 py-3'>
                                                                                        <input type='number' placeholder='Nhập vào' max={0}
                                                                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none option-price-input'
                                                                                        />
                                                                                    </td>
                                                                                    <td className='border-r px-1 md:px-4 py-3'>
                                                                                        <input type='number' defaultValue={0} max={0}
                                                                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none option-stock-input'
                                                                                        />
                                                                                    </td>
                                                                                    <td className='px-1 md:px-4 py-3'>
                                                                                        <input type='text' placeholder='Nhập vào'
                                                                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none option-sku-input'
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-4 px-6 bg-white rounded-md">
                <div className="wrapper">
                    <div className="space-x-4 text-end">
                        <button className="rounded-md py-2 px-4 border border-gray-300 bg-white">
                            <span>Hủy</span>
                        </button>
                        {/* <button className="rounded-md py-2 px-4 border border-gray-300 bg-white">
                                <span>Lưu & Ẩn</span>
                            </button> */}
                        <button onClick={() => getAllVariations()} className="rounded-md bg-blue-300 text-white py-2 px-4">
                            <span>Lưu & Hiển thị</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal