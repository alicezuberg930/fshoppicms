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
import CustomSwitch from '@/app/components/CustomSwitch';
import { updateProductHook } from '../hooks/product.hooks';
import { readCategoryHook } from '../hooks/category.hooks';
// import CategorySelectList from './CategorySelectList';
import { readBrandsHook } from '../hooks/brands.hooks';
// import { isAxiosError } from '../common/utils';

const ProductModal: React.FC<{
    product?: Product, setSelected?: (v: Product | null) => void, page: number
}> = ({ product = null, setSelected, page }) => {
    const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<File[]>([])
    const [variantElements, setVariantElements] = useState<number[]>([0])
    const { IoIosAddCircleOutline, FaRegTrashAlt } = icons
    const [resetAll, setResetAll] = useState<boolean>(false)
    const mutation = updateProductHook(page)
    const { data: categories, isLoading: loadingCategories } = readCategoryHook(1)
    const { data: brands, isLoading: loadingBrands } = readBrandsHook(1)
    const [subCategories, setSubCategories] = useState<Category[]>([])

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
            <section className='rounded-md bg-white mb-4'>
                <div className='p-6 shadow-md'>
                    <div className='panel-header'>
                        <div className='text-xl font-semibold'>Thông tin cơ bản </div>
                    </div>
                    <div className='text-sm'>
                        <div className='panel-content'>
                            <div className=''>
                                <div className='flex items-center'>
                                    <div className='flex-none mr-3 w-36 text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Hình ảnh sản phẩm</span>
                                    </div>
                                    <div className=''>
                                        <div className='flex'>
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
                                <div className='flex items-center'>
                                    <div className='flex-none mr-3 w-36 text-end'>
                                        <span className='text-red-500'>*</span>
                                        <span>Ảnh bìa</span>
                                    </div>
                                    <div className=''>
                                        <div className='flex items-center'>
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
                                <div className='flex items-center'>
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
                                <div className=''>
                                    <div className='edit-row'>
                                        <div className='edit-label edit-title'>
                                            <div className='mandatory'>
                                                <span className='mandatory-icon'>*</span>
                                            </div>
                                            <span>Tên sản phẩm</span>
                                        </div>
                                        <div className='edit-main'>
                                            <div className='popover-wrap'>
                                                <div className='product-edit-form-item custom-len-calc-input'>
                                                    <div className='product-edit-form-item-content'>
                                                        <div className='eds-input'>
                                                            <div className='eds-input__inner eds-input__inner--large'>
                                                                <input placeholder='Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật' type='text' max='Infinity' min='-Infinity' className='eds-input__input' />
                                                                <div className='eds-input__suffix'>
                                                                    <i className='eds-icon eds-input__clear-btn'></i>
                                                                    <span className='eds-input__suffix-split'></span>0/120
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='edit-row is-last-edit-row'>
                                        <div className='edit-label edit-row-left'>
                                            <div className='mandatory'>
                                                <span className='mandatory-icon'>*</span>
                                            </div>
                                            <span>Ngành hàng</span>
                                        </div>
                                        <div className='degrade-wrap edit-row-right-full'>
                                            <div className='product-category'>
                                                <div className='product-category-box'>
                                                    <div className='product-edit-form-item'>
                                                        <div className='product-edit-form-item-content'>
                                                            <div className='popover-wrap'>
                                                                <div className='product-category-box-inner'>
                                                                    <div className='product-category-text'>
                                                                        <span className='product-category-placeholder'>Chọn ngành hàng</span>
                                                                    </div>
                                                                    <i className='eds-icon product-category-icon'></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='edit-row description-wrap'>
                                        <div className='edit-label edit-title'>
                                            <div className='mandatory'>
                                                <span className='mandatory-icon'>*</span>
                                            </div>
                                            <span>Mô tả sản phẩm</span>
                                        </div>
                                        <div className='edit-main'>
                                            <div className='product-description'>
                                                <span className='async-component'>
                                                    <span>
                                                        <div className='ls-upload-cmpt-container product-description-editor'>
                                                            <div className='popover-wrap'>
                                                                <div className='product-edit-form-item custom-len-calc-input'>
                                                                    <div className='product-edit-form-item-content'>
                                                                        <div className='eds-input eds-input__area'>
                                                                            <textarea rows={26} className='eds-input__inner eds-input__inner--normal' />
                                                                        </div>
                                                                        <div className='text-area-label'>
                                                                            <span className='text-area-label-pre'>0</span>
                                                                            <span>3000</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </span>
                                                <div className='banner-generator-container banner-generator' entrance-type='4'>
                                                    <div className='image-selector-wrapper'>
                                                        <div className='eds-upload'>
                                                            <div className='eds-upload-wrapper'>
                                                                <input className='eds-upload__input' type='file' name='file' accept='.jpg, .jpeg, .png' />
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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