'use client'
import dynamic from 'next/dynamic'
const CustomCKEditor = dynamic(() => import('@/app/components/CustomCKEditor'), {
    ssr: false // Prevents Editor.js from being included in server-side rendering
});
// import CustomDatePicker from '@/app/components/DatePicker';
import CustomImagePicker from '@/app/components/CustomImagePicker'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { icons } from '@/app/common/icons';
import { getSubCategories, uploadFile } from '@/app/services/api.service';
import { toast } from 'react-toastify';
import axios from 'axios';
import { updateProductHook } from '../hooks/product.hooks';
// import { readCategoryHook } from '../hooks/category.hooks';
// import CategorySelectList from './CategorySelectList';
import { readBrandsHook } from '../hooks/brands.hooks';
import CategoryModalPicker from './CategoryModalPicker';
// import { isAxiosError } from '../common/utils';

const ProductModal: React.FC<{
    product?: Product, setSelected?: (v: Product | null) => void, page: number
}> = ({ product = null, setSelected, page }) => {
    const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<File[]>([])
    const [variantElements, setVariantElements] = useState<number[]>([0])
    const { IoIosAddCircleOutline, FaRegTrashAlt, MdModeEdit } = icons
    const [resetAll, setResetAll] = useState<boolean>(false)
    const mutation = updateProductHook(page)
    const { data: brands, isLoading: loadingBrands } = readBrandsHook(1)
    const [subCategories, setSubCategories] = useState<Category[]>([])

    const showCategoryListModal = () => {

    }

    const handleProduct = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const currentTarget = e.currentTarget
        const formData = new FormData(currentTarget);
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
        let subs = subCategories.map(sub => sub._id!)
        const tempProduct: Product = Object.fromEntries(formData.entries()); // Convert FormData to an object
        tempProduct['description'] = description || product?.description
        tempProduct['images'] = imageLinks
        tempProduct['options'] = variantInfo()
        tempProduct['childrenCategories'] = subs || []
        mutation!.mutate({ body: tempProduct, product }, {
            onSuccess(data) {
                toast.success(data.message)
                currentTarget.reset()
                setImages([])
                setResetAll(true)
                setDescription('')
                setVariantElements([0])
                if (product != null) setSelected!(null)
            }
        })
    }

    const variantInfo = (): Variant[] => {
        const variantsEls = document.getElementsByClassName('variant')
        let attributes = []
        const variants: Variant[] = []
        for (let i = 0; i < variantsEls.length; i++) {
            const variant = (variantsEls[i].children[0] as HTMLInputElement).value
            const attribute = (variantsEls[i].children[1] as HTMLInputElement).value
            const quantity = +(variantsEls[i].children[2] as HTMLInputElement).value
            const price = +(variantsEls[i].children[3] as HTMLInputElement).value
            const isDuplicate = variants.find(value => value.key.toLowerCase() === variant.toLowerCase());
            if (isDuplicate) {
                isDuplicate.value.push({ val: attribute, quantity, price })
            } else {
                attributes.push({ val: attribute, quantity, price })
                variants.push({ key: variant, value: attributes })
            }
            attributes = []
        }
        return variants
    }

    const findSubcategories = async (e: ChangeEvent<HTMLSelectElement>) => {
        let value: string = e.currentTarget.value
        const response = await getSubCategories(value)
        if (response.category.data) {
            setSubCategories(response.category.data)
        } else {
            setSubCategories([])
        }
    }

    const removeAttribute = (i: number) => {
        setVariantElements(prev => prev.filter(val => val !== i))
    }

    return (
        <div className='w-full py-4 max-w-[1440px] mx-auto'>
            {/* Menu */}
            <div className='bg-white mb-4 rounded-md overflow-hidden'>
                <div className='text-sm relative cursor-pointer'>
                    <div className='flex items-center h-14'>
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
            <section className='overflow-hidden rounded-md bg-white mb-4'>
                <div className='p-6 shadow-md'>
                    <div className='panel-header'>
                        <div className='text-xl font-semibold mb-10'>Thông tin cơ bản </div>
                    </div>
                    <div className='text-sm'>
                        <div className='panel-content'>
                            <div className=''>
                                {/* Hình ảnh */}
                                <div className='flex items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-end'>
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
                                                <CustomImagePicker setImages={setImages} limit={4} />
                                            </div>
                                            {/* <div className='eds-modal image-cropper-modal' close-inside=''>
                                                    <div className='eds-modal__mask'>
                                                        <div className='eds-modal__container'>
                                                            <div className='eds-modal__box'>
                                                                <div className='eds-modal__content eds-modal__content--normal'>
                                                                    <div className='eds-modal__header'>
                                                                        <div className='image-cropper-header'>Chỉnh sửa hình ảnh sản phẩm</div>
                                                                    </div>
                                                                    <div className='eds-modal__body'>
                                                                        <div className='image-cropper-content'>
                                                                            <div className='panel-left'>
                                                                                <div className='image-container'>
                                                                                    <img src='/assets/user.png' className='image' alt='' />
                                                                                </div>
                                                                                <div className='actions-bar'>
                                                                                    <div className='actions-left'>
                                                                                        <div className='zoom'>
                                                                                            <div className='eds-popover eds-popover--dark eds-tooltip tooltip'>
                                                                                                <div className='eds-popover__ref'>
                                                                                                    <div className='icon disabled'>
                                                                                                        <i className='eds-icon icon-zoom'></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='eds-popper eds-popover__popper eds-popover__popper--dark eds-tooltip__popper'>
                                                                                                    <div className='eds-popover__content'>Thu nhỏ</div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='eds-popover eds-popover--dark eds-tooltip tooltip'>
                                                                                                <div className='eds-popover__ref'>
                                                                                                    <div className='icon'>
                                                                                                        <i className='eds-icon icon-zoom'></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='eds-popper eds-popover__popper eds-popover__popper--dark eds-tooltip__popper'>
                                                                                                    <div className='eds-popover__content'>Phóng to</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='eds-popover eds-popover--dark eds-tooltip tooltip'>
                                                                                            <div className='eds-popover__ref'>
                                                                                                <div className='icon'>
                                                                                                    <i className='eds-icon icon-others'></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='eds-popper eds-popover__popper eds-popover__popper--dark eds-tooltip__popper'>
                                                                                                <div className='eds-popover__content'>Xoay phải 90°</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='eds-popover eds-popover--dark eds-tooltip tooltip'>
                                                                                            <div className='eds-popover__ref'>
                                                                                                <div className='icon'>
                                                                                                    <i className='eds-icon icon-others'></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='eds-popper eds-popover__popper eds-popover__popper--dark eds-tooltip__popper'>
                                                                                                <div className='eds-popover__content'>Lật ngược ảnh theo chiều ngang</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='eds-popover eds-popover--dark eds-tooltip tooltip'>
                                                                                            <div className='eds-popover__ref'>
                                                                                                <div className='icon'>
                                                                                                    <i className='eds-icon icon-others'></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='eds-popper eds-popover__popper eds-popover__popper--dark eds-tooltip__popper'>
                                                                                                <div className='eds-popover__content'>Lật ngược ảnh theo chiều dọc</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='actions-right'>
                                                                                        <button type='button' className='eds-button eds-button--small'>
                                                                                            <span>Nhập Lại</span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='mask'>
                                                                                    <div className='mask-loading'>
                                                                                        <img src='/assets/user.png' loading='eager' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='panel-right'>
                                                                                <div className='label label-preview'>Xem trước</div>
                                                                                <div className='preview-image-container'>
                                                                                    <div className='preview-image'>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='resize-triggers'>
                                                                            <div className='expand-trigger'></div>
                                                                            <div className='contract-trigger'></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='eds-modal__footer'>
                                                                        <div className='eds-modal__footer-buttons'>
                                                                            <button type='button' className='eds-button eds-button--normal'>
                                                                                <span>Đóng</span>
                                                                            </button>
                                                                            <button type='button' className='eds-button eds-button--primary eds-button--normal disabled'>
                                                                                <span>Lưu</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <i className='eds-icon eds-modal__close'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Ảnh bìa */}
                                <div className='flex items-center'>
                                    <div className='flex-none mr-3 w-36 text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Ảnh bìa</span>
                                    </div>
                                    <div className=''>
                                        <div className='flex items-center mb-5'>
                                            <div className=''>
                                                <CustomImagePicker setImages={setImages} isDisabled={true} />
                                            </div>
                                            <div className='ml-6 text-xs text-gray-400'>
                                                <ul>
                                                    <li className='list-disc'>Tải lên hình ảnh 1:1.</li>
                                                    <li className='list-disc'>Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Video */}
                                <div className='flex items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-end'>
                                        <div>Video sản phẩm</div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className=''>
                                            <CustomImagePicker setImages={setImages} isDisabled={true} />
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
                                <div className='flex items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Tên sản phẩm</span>
                                    </div>
                                    <div className='w-full'>
                                        <div className=''>
                                            <input placeholder='Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật' type='text' name='name'
                                                className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                            />
                                            {/* <div className='eds-input__suffix'>
                                                <i className='eds-icon eds-input__clear-btn'></i>
                                                <span className='eds-input__suffix-split'></span>0/120
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Ngành hàng (danh mục) */}
                                <div className='flex items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Ngành hàng</span>
                                    </div>
                                    <div className='w-full'>
                                        <CategoryModalPicker />
                                    </div>
                                </div>
                                {/* Description  */}
                                <div className='flex items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 text-end'>
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
                                <div className='flex items-center'>
                                    <div className='flex-none mr-3 w-36 text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Thương hiệu</span>
                                    </div>
                                    <div className='w-full'>
                                        <div className=''>
                                            <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name="category">
                                                {loadingBrands ?
                                                    <option value="" disabled>Không có dữ liệu</option> :
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
                <div className='p-6 shadow-md'>
                    <div className='panel-header'>
                        <div className='text-xl font-semibold mb-10'>Thông tin bán hàng</div>
                    </div>
                    <div className='text-sm'>
                        <div className='panel-content'>
                            <div className=''>
                                {/* Phân loại hàng */}
                                <div className='flex items-center mb-5'>
                                    <div className='flex-none mr-3 w-36 '>
                                        <div className='flex justify-end gap-1 items-center'>
                                            <span className='relative flex w-2 h-2'>
                                                <div className='absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping'></div>
                                                <div className='relative inline-flex w-2 h-2 bg-blue-500 rounded-full'></div>
                                            </span>
                                            <span>Phân loại hàng</span>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className=''>
                                            <button className='text-blue-500 border-gray-300 p-2 border border-dashed rounded-md outline-none'>
                                                Thêm nhóm phân loại
                                            </button>
                                            {/* <div className='eds-input__suffix'>
                                                <i className='eds-icon eds-input__clear-btn'></i>
                                                <span className='eds-input__suffix-split'></span>0/120
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductModal