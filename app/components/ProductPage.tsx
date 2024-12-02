'use client'
import dynamic from 'next/dynamic'
const CustomCKEditor = dynamic(() => import('@/app/components/CKEditor'), {
    ssr: false // Prevents Editor.js from being included in server-side rendering
});
// import CustomDatePicker from '@/app/components/DatePicker';
import CustomImagePicker from '@/app/components/ImagePicker'
import { useEffect, useState } from 'react';
import { icons } from '@/app/common/icons';
import { createProduct, getCategories, updateProduct, uploadFile } from '@/app/services/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import CustomSwitch from '@/app/components/CustomSwitch';
import { useSession } from 'next-auth/react';

const ProductPageComponent: React.FC<{
    product?: Product, setSelected?: (v: Product | null) => void, refreshData?: () => void
}> = ({ product, setSelected, refreshData }) => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    // const [formData, setFormData] = useState<FormData | null>(null)
    const [category, setCategory] = useState<string>("")
    const [images, setImages] = useState<File[]>([])
    const [productCode, setProductCode] = useState<string>("")
    const [categories, setCategories] = useState<Category[]>([])
    const [enableVariation, setEnableVariation] = useState<boolean>(false)
    const [variantElements, setVariantElements] = useState<number[]>([])
    const { IoIosAddCircleOutline, FaRegTrashAlt } = icons
    const { data, status } = useSession();

    useEffect(() => {
        const getCategoriesAction = async () => {
            try {
                const response = await getCategories(data?.user.access_token ?? "");
                if (response.data?.status === "OK") {
                    setCategories(response.data.data.categories as Category[])
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error?.response?.data.error)
                }
            }
        }
        if (status === "authenticated") getCategoriesAction()
    }, [status])

    const productAction = async () => {
        if (images.length < 1 || images.length > 10) {
            toast.error("Cần ít nhất 1 ảnh và không hơn 10 ảnh")
            return
        }
        let form = new FormData()
        let imageLinks: string[] = []
        for (let i = 0; i < images.length; i++) {
            form.set("file", images[i])
            try {
                const response = await uploadFile(data?.user.access_token ?? "", form)
                if (response?.data.status === "OK") {
                    imageLinks.push(response.data.url)
                } else {
                    toast.error(response.data.error)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error?.response?.data.error)
                }
            }
        }

        const p: Product = {
            name: name || (product?.name ?? ""),
            description: description || (product?.description ?? ""),
            price: price || (product?.price ?? 0),
            stock: stock || (product?.stock ?? 0),
            category: category || (product?.category ?? ""),
            images: imageLinks,
            productCode: productCode || (product?.productCode ?? categories[0]._id!),
            options: variantInfo()
        }
        console.log(p);

        if (product != null) {
            try {
                const response = await updateProduct(data?.user.access_token ?? "", product._id!, p)
                if (response?.status === "OK") {
                    toast.success(response.message)
                    setSelected!(null)
                    refreshData!()
                } else {
                    toast.error(response.message)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error?.response?.data.error)
                }
            }
        } else {
            try {
                const response = await createProduct(data?.user.access_token ?? "", p)
                if (response?.status === "OK") {
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error?.response?.data.error)
                }
            }
        }
    }

    const variantInfo = () => {
        const variantsEls = document.getElementsByClassName('variant')
        let attributes = []
        const variants: Variant[] = []
        for (let i = 0; i < variantsEls.length; i++) {
            const variant = (variantsEls[i].children[0] as HTMLInputElement).value
            const attribute = (variantsEls[i].children[1] as HTMLInputElement).value
            const stock = +(variantsEls[i].children[2] as HTMLInputElement).value
            const isDuplicate = variants.find(value => value.key.toLowerCase() === variant.toLowerCase());
            if (isDuplicate) {
                isDuplicate.value.push({ val: attribute, quantity: stock })
            } else {
                attributes.push({ val: attribute, quantity: stock })
                variants.push({ key: variant, value: attributes })
            }
            attributes = []
        }
        return variants
    }

    const removeAttribute = (i: number) => {
        setVariantElements(variantElements => variantElements.filter(val => val !== i))
    }

    return (
        <div className='w-full'>
            <div className=''>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{product != null ? 'Sửa' : 'Thêm'} sản phẩm</h3>
                </div>
                <div className='p-3'>
                    <form className='' onSubmit={(e) => e.preventDefault()}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2} className='bg-primary'>&nbsp;</td>
                                    <td className='py-3 font-bold text-sm'>Phân loại sản phẩm</td>
                                </tr>

                                <tr>
                                    <td className='py-3'>Thương hiệu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <select onChange={(e) => setCategory(e.target.value)} className='border-gray-300 p-2 border rounded-md w-full outline-none' autoComplete='off'>
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
                                        {/* <span className='w-[1066px] select2 select2-container select2-container--default' dir='ltr'
                                                data-select2-id='4'>
                                                <span className='selection'><span
                                                    className='select2-selection select2-selection--single'
                                                    role='combobox' aria-haspopup='true' aria-expanded='false' aria-disabled='false'
                                                    aria-labelledby='select2-brand-ee-container'>
                                                    <span className='select2-selection__rendered'
                                                        id='select2-brand-ee-container' role='textbox'
                                                        aria-readonly='true' title='Vui lòng chọn...'>Vui lòng
                                                        chọn...</span>
                                                    <span className='select2-selection__arrow' role='presentation'><b role='presentation'></b></span>
                                                </span>
                                                </span>
                                                <span className='dropdown-wrapper' aria-hidden='true'></span>
                                            </span> */}
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='py-3 font-bold text-sm'>Thông tin sản phẩm</td>
                                </tr>

                                <tr>
                                    <td className='py-3'>Hình</td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker images={product?.images} setImages={setImages} />
                                        </div>
                                        <p className='mb-0 text-red-500 text-sm'><b>Kích thước ảnh:</b> 700 x 700 (px)</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3'>Mã sản phẩm<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <input onChange={(e) => setProductCode(e.target.value)} defaultValue={product?.productCode}
                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' autoComplete='off'
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3'>Tên Sản Phẩm<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <input onChange={(e) => setName(e.target.value)} defaultValue={product?.name}
                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' autoComplete='off'
                                        />
                                    </td>
                                </tr>

                                {/* <tr>
                                        <td className='py-3'>Giới thiệu/Mô tả ngắn</td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <textarea rows={5} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' />
                                        </td>
                                    </tr> */}

                                {/* <tr>
                                        <td className='py-3'>Trạng thái</td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <div className='space-x-2 text-white text-xs'>
                                                <label className='bg-[#347ab6] p-2 rounded-md'>
                                                    <input name='status' type='radio' value='1' autoComplete='off' defaultChecked />
                                                    Hiển thị
                                                </label>
                                                <label className='bg-[#eead51] p-2 rounded-md'>
                                                    <input name='status' type='radio' value='0' autoComplete='off' />
                                                    Không Hiển thị
                                                </label>
                                            </div>
                                        </td>
                                    </tr> */}
                                {/* <tr>
                                        <td className='py-3'>Tình trạng</td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <div className='flex flex-wrap gap-2 text-white text-xs'>
                                                <label className='bg-[#5eb95b] p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='1' name='tinhtrang' defaultChecked />
                                                    <b>Đang có hàng</b>
                                                </label>
                                                <label className='bg-[#eead51] p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='9' name='tinhtrang' />
                                                    <b>Hết hàng</b>
                                                </label>
                                                <label className='bg-[#5ac0dd] p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='2' name='tinhtrang' />
                                                    <b>Hàng đặt theo yêu cầu</b>
                                                </label>
                                                <label className='bg-red-500 p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='3' name='tinhtrang' />
                                                    <b>Hàng đang về</b>
                                                </label>
                                            </div>
                                        </td>
                                    </tr> */}
                                <tr>
                                    <td className='py-3'>Biến thể</td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <div className='flex items-center gap-6'>
                                            <b className=''>Bật tắt biến thể</b>
                                            <CustomSwitch setEnable={setEnableVariation} />
                                            {
                                                !enableVariation ? null :
                                                    <div onClick={() => setVariantElements(variantElements => [...variantElements, variantElements.length])}
                                                        className='flex items-center gap-1 bg-gray-500 p-2 rounded-md text-white text-xs'
                                                    >
                                                        <IoIosAddCircleOutline className='w-5 h-5' />
                                                        <b>Thêm biến thể</b>
                                                    </div>
                                            }
                                        </div>
                                        {
                                            product?.options != null ?
                                                <div className='mt-2'>
                                                    {
                                                        product!.options!.map((variant, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {
                                                                        variant.value.map((attr, i) => {
                                                                            return (
                                                                                <div className='flex gap-2 my-2 variant' key={i} >
                                                                                    <input defaultValue={variant.key} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-[40%] outline-none' type='text' placeholder='Biến thể' />
                                                                                    <input defaultValue={attr.val} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-[30%] outline-none' type='text' placeholder='Thuộc tính' />
                                                                                    <input defaultValue={attr.quantity} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-[30%] outline-none' type='number' placeholder='Kho' />
                                                                                    <button className='bg-red-500 p-2 rounded-md text-white'
                                                                                        onClick={() => removeAttribute(i)}
                                                                                    >
                                                                                        <FaRegTrashAlt className='w-5 h-5' />
                                                                                    </button>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                : null
                                        }
                                        {
                                            variantElements.length == 0 || !enableVariation ? null :
                                                <div className='mt-2'>
                                                    {
                                                        variantElements.map(e => {
                                                            return (
                                                                <div className='flex gap-2 my-2 variant' key={e}>
                                                                    <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-[40%] outline-none' type='text' placeholder='Biến thể' />
                                                                    <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-[30%] outline-none' type='text' placeholder='Thuộc tính' />
                                                                    <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-[30%] outline-none' type='number' placeholder='Kho' />
                                                                    <button className='bg-red-500 p-2 rounded-md text-white'
                                                                        onClick={() => removeAttribute(e)}
                                                                    >
                                                                        <FaRegTrashAlt className='w-5 h-5' />
                                                                    </button>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                        }
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='py-3 font-bold text-sm'>Giá bán</td>
                                </tr>
                                <tr>
                                    <td className='py-3'>Giá bán<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <input onChange={(e) => setPrice(+e.target.value)} defaultValue={product?.price} name='price'
                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='number' autoComplete='off'
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3'>Tồn kho<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <input onChange={(e) => setStock(+e.target.value)} defaultValue={product?.stock} name='stock'
                                            className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='number' autoComplete='off'
                                        />
                                    </td>
                                </tr>

                                {/* <tr>
                                        <td className='py-3'>Giá khuyến mãi</td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <div className='flex lg:flex-row flex-col gap-5'>
                                                <div className='flex flex-col flex-auto'>
                                                    <label>Giá khuyến mãi</label>
                                                    <input name='price_sale' value='0' className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' autoComplete='off' />
                                                </div>
                                                <div className='flex flex-col flex-auto'>
                                                    <label>Ngày bắt đầu</label>
                                                    <CustomDatePicker />
                                                </div>
                                                <div className='flex flex-col flex-auto'>
                                                    <label>Ngày kết thúc</label>
                                                    <CustomDatePicker />
                                                </div>
                                            </div>
                                            <small className='text-[#eead51]'>
                                                - Nhập <b className='text-red-500'>0</b> nếu không có giá bán khuyến mãi
                                            </small>
                                        </td>
                                    </tr> */}

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='py-3 font-bold text-sm'>Chi tiết sản phẩm</td>
                                </tr>
                                {/* <tr>
                                        <td className='py-3'>Video</td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' autoComplete='off' />
                                            <div>
                                                <small className='text-[#eead51]'>
                                                    - Copy đường dẫn Video từ Youtube.<br />
                                                    - Đường dẫn Youtube là đường dẫn xem trực tiếp trên website được ( Không
                                                    phải URL chia sẽ Video).<br />
                                                    - VD: http://www.youtube.com/watch?v=Y8FU6-J5NnE
                                                </small>
                                            </div>
                                        </td>
                                    </tr> */}

                                <tr>
                                    <td className='py-3'>Chi tiết sản phẩm</td>
                                    <td className='py-3'>:</td>
                                    <td className='py-3'>
                                        <CustomCKEditor value={setDescription} defaultValue={product?.description || "Nhập mô tả của bạn"} />
                                    </td>
                                </tr>

                                {/* <tr>
                                        <td className='py-3'>Thông số kỹ thuật</td>
                                        <td className='py-3'>:</td>
                                        <td className='py-3'>
                                            <CustomCKEditor />
                                        </td>
                                    </tr> */}

                                {/* <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2}>&nbsp;</td>
                                        <td className='py-3 font-bold text-sm'>SEO</td>
                                    </tr>
                                    <tr>
                                        <td className='py-3'>URL: Slug<b className='text-red-500'>*</b></td>
                                        <td className='py-3'><b>:</b></td>
                                        <td className='py-3'>
                                            <div className='flex items-center border-gray-300 border rounded-md'>
                                                <div className='bg-[#eeeeee] p-2 h-full font-bold text-red-500'>https://fshoppii.com/</div>
                                                <input className='p-2 border focus:border-blue-500 w-full outline-none' type='text'  autoComplete='off' />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3'>Meta Title<b className='text-red-500'>*</b></td>
                                        <td className='py-3'><b>:</b></td>
                                        <td className='py-3'>
                                            <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text'  autoComplete='off' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3'>Meta Description</td>
                                        <td className='py-3'><b>:</b></td>
                                        <td className='py-3'>
                                            <textarea className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={2} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3'>Meta keyword</td>
                                        <td className='py-3'><b>:</b></td>
                                        <td className='py-3'>
                                            <textarea className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={2} />
                                        </td>
                                    </tr> */}
                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' onClick={() => productAction()} className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
                                            {product != null ? <button onClick={() => setSelected!(null)} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button> : null}
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

export default ProductPageComponent