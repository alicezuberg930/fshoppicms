'use client'
// import dynamic from 'next/dynamic'
// const CustomCKEditor = dynamic(() => import('@/app/components/CustomCKEditor'), {
//     ssr: false // Prevents Editor.js from being included in server-side rendering
// })
import CustomImagePicker from '@/app/components/CustomImagePicker'
import React, { FormEvent, useEffect, useState } from 'react'
import { icons } from '@/app/common/icons'
import { createProductHook, updateProductHook } from '../hooks/product.hooks'
import { readBrandsHook } from '../hooks/brands.hooks'
import CategoryModalPicker from './CategoryModalPicker'
import { uploadFilesHook } from '../hooks/common.hooks'
import { useDispatch } from 'react-redux'
import { setIsLoadingOverlay } from '../services/common.slice'
import { useRouter } from 'next/navigation'
import { generateSecureRandomString } from '../common/utils'

const ProductModal: React.FC<{ product?: Product, page: number }> = ({ product = null, page }) => {
    // const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<File[]>([])
    const { FaRegTrashAlt, MdOutlineCancel, IoIosAddCircleOutline } = icons
    // const [resetAll, setResetAll] = useState<boolean>(false)
    const updateHook = updateProductHook(page)
    const createHook = createProductHook(page)
    const { data: brands, isLoading: loadingBrands } = readBrandsHook(1)
    const uploadHook = uploadFilesHook()
    const dispatch = useDispatch()
    const [variations, setVariations] = useState<number[]>([])
    const [options, setOptions] = useState<number[][]>([])
    const router = useRouter()

    useEffect(() => {
        if (product != null && product.options!.length > 0) {
            const newVariations: number[] = []
            const newOptions: number[][] = []
            for (let i = 0; i < product.options!.length; i++) {
                newVariations.push(i)
                const optionValues: number[] = []
                for (let j = 0; j < product.options![i].value!.length; j++) {
                    optionValues.push(j)
                }
                newOptions.push(optionValues); // Add the options array for this variation
            }
            setVariations(newVariations)
            setOptions(newOptions)
        }
    }, [])

    const getAllVariations = async (): Promise<Variant[]> => {
        const tempVariation: Variant[] = []
        if (variations.length > 0) {
            const variationElements = document.querySelectorAll('.variation-item')
            const variationTableElements = document.querySelectorAll('.variation-table')
            let attributes: any[] = []
            let formData = new FormData()
            for (let j = 0; j < variationElements.length; j++) {
                let variationNameInput = variationElements[j].querySelector('.variation-name-input') as HTMLInputElement
                let optionElements = variationElements[j].querySelectorAll('.option-name-input') as NodeListOf<HTMLInputElement>
                let table = variationTableElements[j]

                for (let i = 0; i < optionElements.length; i++) {
                    let optionPriceInput = table.querySelectorAll('.option-price-input')[i] as HTMLInputElement
                    let optionStockInput = table.querySelectorAll('.option-stock-input')[i] as HTMLInputElement
                    let optionSKUInput = table.querySelectorAll('.option-sku-input')[i] as HTMLInputElement
                    let optionImageInput = table.querySelectorAll('.option-file-input')[i] as HTMLInputElement
                    formData.set('file', optionImageInput.files![0])
                    await new Promise(resolve => {
                        uploadHook.mutate(formData, {
                            onSuccess(data) {
                                attributes.push({
                                    val: optionElements[i].value, price: +optionPriceInput.value,
                                    quantity: +optionStockInput.value, sku: optionSKUInput.value, img: data.url
                                })
                                resolve(null);
                            }
                        })
                    })
                }
                tempVariation.push({ key: variationNameInput.value, value: attributes })
                attributes = []
            }
        } else {
            const noVariationPriceInput = document.querySelector('.no-variation-price') as HTMLInputElement
            const noVariationStockInput = document.querySelector('.no-variation-stock') as HTMLInputElement
            tempVariation.push({
                key: '',
                value: [
                    {
                        val: 'No variation',
                        img: '',
                        price: +noVariationPriceInput.value,
                        quantity: +noVariationStockInput.value
                    }
                ]
            })
        }
        console.log(tempVariation)
        return tempVariation
    }

    const applyAllOptions = () => {
        const allPrice = document.getElementById('all-price-option') as HTMLInputElement
        const allStock = document.getElementById('all-stock-option') as HTMLInputElement
        const allSKU = document.getElementById('all-sku-option') as HTMLInputElement
        const optionPriceInputs = document.querySelectorAll('.option-price-input') as NodeListOf<HTMLInputElement>
        const optionStockInputs = document.querySelectorAll('.option-stock-input') as NodeListOf<HTMLInputElement>
        const optionSKUInputs = document.querySelectorAll('.option-sku-input') as NodeListOf<HTMLInputElement>
        optionPriceInputs.forEach(v => v.value = allPrice.value)
        optionStockInputs.forEach(v => v.value = allStock.value)
        optionSKUInputs.forEach(v => v.value = allSKU.value)
    }

    const handleProductAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // dispatch(setIsLoadingOverlay(true))
        const currentTarget = e.currentTarget
        const formData = new FormData(currentTarget)
        console.log(await getAllVariations());
        console.log(Object.fromEntries(formData.entries()));

        // return
        let imageLinks: string[] = []
        // if (product?.images != null && product?.images.length > 0 && images.length == 0) imageLinks = product.images
        if (images.length > 0) {
            const imageForm = new FormData()
            for (let i = 0; i < images.length; i++) {
                imageForm.set('file', images[i])
                await new Promise((resolve) => {
                    uploadHook.mutate(imageForm, {
                        onSuccess(data) {
                            imageLinks.push(data.url)
                            resolve(null);
                        }
                    })
                })
            }
        }
        formData.delete('file')
        const tempProduct: Product = Object.fromEntries(formData.entries())
        tempProduct['images'] = imageLinks
        tempProduct['options'] = await getAllVariations()
        tempProduct['childrenCategories'] = []
        // temporary test
        tempProduct['price'] = 1
        tempProduct['stock'] = 1
        tempProduct['weight'] = 0.5
        tempProduct['length'] = 30
        tempProduct['width'] = 30
        tempProduct['height'] = 30
        tempProduct['information'] = 'information'
        tempProduct['specifications'] = 'specifications'
        tempProduct['ingredients'] = 'ingredients'
        tempProduct['usage'] = 'usage'
        tempProduct['packaging'] = 'Quy cách đóng gói type String'
        if (product != null) {
            updateHook.mutate({ body: tempProduct, id: product!._id! })
        }
        else {
            createHook.mutate({ body: tempProduct })
        }
        dispatch(setIsLoadingOverlay(false))
    }

    return (
        <div className='w-full py-4 max-w-[1440px] mx-auto'>
            <form className='w-full' onSubmit={handleProductAction}>
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
                <section className='overflow-hidden rounded-md bg-white mb-4 shadow-lg'>
                    <div className='p-2 md:p-6'>
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
                                            {/* <div className='flex py-2'>
                                                <div className='flex'>
                                                    <label className='mr-3 gap-3 flex items-center'>
                                                        <input type='radio' value='1' name='ratio' />
                                                        <span data-v-ba3e96bb='' className=''>Hình ảnh tỷ lệ 1:1</span>
                                                    </label>
                                                    <label className='mr-3 gap-3 flex items-center'>
                                                        <input type='radio' value='2' name='ratio' />
                                                        <span className=''>Hình ảnh tỷ lệ 3:4</span>
                                                    </label>
                                                </div>
                                                <button type='button' className='text-blue-500'>
                                                    <span>Xem ví dụ</span>
                                                </button>
                                            </div> */}
                                            <div className=''>
                                                <div className=''>
                                                    <CustomImagePicker id='images' setImages={setImages} images={product?.images ?? ['']} limit={9} />
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
                                                {/* product ? [product.images![0]] : images.length > 0 ? [URL.createObjectURL(images[0])] :  */}
                                                <CustomImagePicker id='banner' isDisabled={true} images={['']} isMultiple={false} hideEdit={true} />
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
                                                <input placeholder='Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật' type='text' name='name' defaultValue={product?.name ?? ''}
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
                                                <input placeholder='Mã sản phẩm' type='text' name='productCode' disabled
                                                    defaultValue={typeof product?.productCode === 'object' ? (product?.productCode?.code ?? '') : generateSecureRandomString(20)}
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
                                    {/* Description */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Mô tả sản phẩm</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className='product-description'>
                                                <div className=''>
                                                    <textarea className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                        defaultValue={product?.description ?? ''} rows={9} name='description'
                                                    />
                                                    {/* <div className='text-area-label'>
                                                    <span className='text-area-label-pre'>0</span>
                                                    <span>3000</span>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Brand */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Thương hiệu</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <select defaultValue={product?.brand ?? ''} className='border-gray-300 p-2 border rounded-md w-full outline-none' name='brand'>
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
                <section className='overflow-hidden rounded-md bg-white mb-4 shadow-lg'>
                    <div className='p-2 md:p-6'>
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
                                                                                    <input placeholder='e.g. Color, etc' type='text' defaultValue={product ? product?.options![i]?.key : ''}
                                                                                        className='variation-name-input border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                                                    />
                                                                                </div>
                                                                                <div className='flex-none p-0 sm:pr-2 opacity-0'>
                                                                                    <button type='button' className='pl-2'>
                                                                                        <IoIosAddCircleOutline size={16} />
                                                                                    </button>
                                                                                    <button type='button' className='pl-2'>
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
                                                                                                    <input placeholder='e.g. Red, etc' type='text'
                                                                                                        defaultValue={product?.options![i]?.value![optionIndex]?.val ?? ""}
                                                                                                        // defaultValue={product && product!.options && product!.options![i]?.value ? product!.options![i].value![optionIndex]?.val : ""}
                                                                                                        className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none option-name-input'
                                                                                                    />
                                                                                                </div>
                                                                                                <div className='h-4 flex-none'>
                                                                                                    <button type='button' className='pl-2 text-gray-400' onClick={() => {
                                                                                                        setOptions(prev => {
                                                                                                            const newOptions = prev.map((option, index) => index === i ? [...option, option.length] : option)
                                                                                                            return newOptions
                                                                                                        })
                                                                                                    }}>
                                                                                                        <IoIosAddCircleOutline size={16} />
                                                                                                    </button>
                                                                                                    <button type='button' className='pl-2 text-gray-400' onClick={() => {
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
                                                <button type='button' className='flex items-center text-blue-500 border-gray-300 p-2 border border-dashed rounded-md outline-none'
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
                                    {/* Giá (không có biến thể) */}
                                    {variations.length < 1 &&
                                        <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                            <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                                <span className='text-red-500'>*</span>
                                                <span>Giá</span>
                                            </div>
                                            <div className='w-full'>
                                                <div className=''>
                                                    <input placeholder='Nhập vào' type='number'
                                                        className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none no-variation-price'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* Kho hàng (không có biến thể) */}
                                    {variations.length < 1 &&
                                        <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                            <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                                <span className='text-red-500'>*</span>
                                                <span>Kho hàng</span>
                                            </div>
                                            <div className='w-full'>
                                                <div className=''>
                                                    <input placeholder='Nhập vào' type='number' min={0} defaultValue={0}
                                                        className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none no-variation-stock'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* Danh sách phân loại hàng */}
                                    {variations.length > 0 &&
                                        <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                            <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                                <span>Danh sách phân loại</span>
                                            </div>
                                            <div className='w-full'>
                                                <div className='flex flex-wrap gap-3'>
                                                    <div className='flex items-center flex-auto'>
                                                        <div className='flex-auto'>
                                                            <div className='eds-form-item__control'>
                                                                <div className='eds-form-item__content'>
                                                                    <input placeholder='Giá' type='number' id='all-price-option'
                                                                        className='border-gray-300 p-2 border focus:border-blue-500 rounded-l-md w-full outline-none'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex-auto'>
                                                            <div className='eds-form-item__control'>
                                                                <div className='eds-form-item__content'>
                                                                    <input placeholder='Kho hàng' type='number' id='all-stock-option'
                                                                        className='border-gray-300 p-2 border focus:border-blue-500 w-full outline-none'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex-auto'>
                                                            <div className='eds-form-item__control'>
                                                                <div className='eds-form-item__content'>
                                                                    <div className='eds-input'>
                                                                        <input placeholder='SKU phân loại' type='text' id='all-sku-option'
                                                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-r-md w-full outline-none'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex-none'>
                                                        <button type='button' onClick={applyAllOptions} className='rounded-md bg-blue-300 gap-1 text-white py-2 px-4'>
                                                            <span>Áp dụng cho tất cả phân loại</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className='overflow-hidden rounded-md border border-gray-300 mt-5'>
                                                    {
                                                        variations.map((_, i) => {
                                                            return (
                                                                <table key={i} className='w-full text-center variation-table'>
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
                                                                                            <CustomImagePicker showTitle={false} id={`option-${i}-${optionIndex}`}
                                                                                                isMultiple={false} images={[product?.options![i]?.value![optionIndex]?.img ?? '']}
                                                                                            />
                                                                                        </td>
                                                                                        <td className='border-r px-1 md:px-4 py-3'>
                                                                                            <input type='number' placeholder='Nhập vào' defaultValue={product?.options![i]?.value![optionIndex]?.price ?? 0} min={0}
                                                                                                className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none option-price-input'
                                                                                            />
                                                                                        </td>
                                                                                        <td className='border-r px-1 md:px-4 py-3'>
                                                                                            <input type='number' defaultValue={product?.options![i]?.value![optionIndex]?.quantity ?? 0} min={0}
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
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='py-4 px-6 bg-white rounded-md'>
                    <div className='wrapper'>
                        <div className='space-x-4 text-end'>
                            <button type='reset' className='rounded-md py-2 px-4 border border-gray-300 bg-white'>
                                <span>Hủy</span>
                            </button>
                            {/* <button className='rounded-md py-2 px-4 border border-gray-300 bg-white'>
                            <span>Lưu & Ẩn</span>
                        </button> */}
                            <button className='rounded-md bg-blue-300 text-white py-2 px-4'>
                                <span>Lưu & Hiển thị</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductModal