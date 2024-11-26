'use client'
import dynamic from 'next/dynamic'
const CustomCKEditor = dynamic(() => import('@/app/components/ckeditor'), {
    ssr: false // Prevents Editor.js from being included in server-side rendering
});
import CustomDatePicker from '@/app/components/datepicker'
import CustomImagePicker from '@/app/components/imagepicker'
import Switch from '@/app/components/switch';
import { useState } from 'react';
import { icons } from '@/app/common/icons';

const ProductAddForm: React.FC = () => {
    const [enableVariation, setEnableVariation] = useState<boolean>(false)
    const [variantElements, setVariantElements] = useState<number[]>([])
    const { IoIosAddCircleOutline, FaRegTrashAlt } = icons

    return (
        <>
            <div className='w-full'>
                <div className=''>
                    <div className='p-3 bg-[#f5f5f5]'>
                        <h3 className='text-red-500 font-semibold'>Thêm sản phẩm</h3>
                    </div>
                    <div className='p-3'>
                        {/* <form className='' onSubmit={(e) => e.preventDefault()}> */}
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2} className='bg-primary'>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Phân loại sản phẩm</td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Thương hiệu<b className='text-danger'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <select className='outline-none rounded-md border p-2 border-gray-300 w-full' autoComplete='off'>
                                            <option value=''>Vui lòng chọn...</option>
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
                                    <td className='font-bold text-sm py-3'>Thông tin sản phẩm</td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Hình</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <div className='mb-2'>
                                            <CustomImagePicker />
                                        </div>
                                        <p className='text-red-500 mb-0 text-sm'><b>Kích thước ảnh:</b> 700 x 700 (px)</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Mã sản phẩm<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Tên Sản Phẩm<b className='text-danger'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Giới thiệu/Mô tả ngắn</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <textarea rows={5} className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Trạng thái</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <div className='space-x-2 text-white text-xs'>
                                            <label className='p-2 rounded-md bg-[#347ab6]'>
                                                <input name='status' type='radio' value='1' autoComplete='off' defaultChecked />
                                                Hiển thị
                                            </label>
                                            <label className='p-2 rounded-md bg-[#eead51]'>
                                                <input name='status' type='radio' value='0' autoComplete='off' />
                                                Không Hiển thị
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Tình trạng</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <div className='gap-2 text-white text-xs flex flex-wrap'>
                                            <label className='p-2 rounded-md bg-[#5eb95b]'>
                                                <input type='radio' value='1' name='tinhtrang' defaultChecked />
                                                <b>Đang có hàng</b>
                                            </label>
                                            <label className='p-2 rounded-md bg-[#eead51]'>
                                                <input type='radio' value='9' name='tinhtrang' />
                                                <b>Hết hàng</b>
                                            </label>
                                            <label className='p-2 rounded-md bg-[#5ac0dd]'>
                                                <input type='radio' value='2' name='tinhtrang' />
                                                <b>Hàng đặt theo yêu cầu</b>
                                            </label>
                                            <label className='p-2 rounded-md bg-red-500'>
                                                <input type='radio' value='3' name='tinhtrang' />
                                                <b>Hàng đang về</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Biến thể</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <div className='flex gap-6 items-center'>
                                            <b className=''>Bật tắt biến thể</b>
                                            <Switch setEnable={setEnableVariation} />
                                            {
                                                !enableVariation ? null :
                                                    <button onClick={() => setVariantElements(variantElements => [...variantElements, variantElements.length])}
                                                        className='bg-gray-500 text-white text-xs p-2 rounded-md flex gap-1 items-center'
                                                    >
                                                        <IoIosAddCircleOutline className='w-5 h-5' />
                                                        <b>Thêm biến thể</b>
                                                    </button>
                                            }
                                        </div>
                                        {
                                            variantElements.length == 0 || !enableVariation ? null :
                                                <div className='mt-2'>
                                                    {
                                                        variantElements.map(e => {
                                                            return (
                                                                <div key={e}>
                                                                    <div className='flex flex-wrap gap-2 my-2'>
                                                                        <input className='outline-none rounded-md border p-2 border-gray-300 flex-auto focus:border-blue-500' type='text' placeholder='Biến thể' />
                                                                        <input className='outline-none rounded-md border p-2 border-gray-300 flex-auto focus:border-blue-500' type='text' placeholder='Thuộc tính' />
                                                                        <input className='outline-none rounded-md border p-2 border-gray-300 flex-auto focus:border-blue-500' type='number' placeholder='Kho' />
                                                                        <button className='p-2 rounded-md text-white bg-red-500'
                                                                            onClick={() => setVariantElements(variantElements => variantElements.filter(i => i !== e))}
                                                                        >
                                                                            <FaRegTrashAlt className='w-5 h-5' />
                                                                        </button>
                                                                    </div>
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
                                    <td className='font-bold text-sm py-3'>Giá bán</td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Giá bán<b className='text-danger'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Giá khuyến mãi</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <div className='flex flex-col lg:flex-row gap-5'>
                                            <div className='flex flex-col flex-auto'>
                                                <label>Giá khuyến mãi</label>
                                                <input name='price_sale' value='0' className='outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full' type='text' autoComplete='off' />
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
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Chi tiết sản phẩm</td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Video</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full' type='text' autoComplete='off' />
                                        <div>
                                            <small className='text-[#eead51]'>
                                                - Copy đường dẫn Video từ Youtube.<br />
                                                - Đường dẫn Youtube là đường dẫn xem trực tiếp trên website được ( Không
                                                phải URL chia sẽ Video).<br />
                                                - VD: http://www.youtube.com/watch?v=Y8FU6-J5NnE
                                            </small>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Chi tiết sản phẩm</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <CustomCKEditor />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Thông số kỹ thuật</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <CustomCKEditor />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>SEO</td>
                                </tr>
                                <tr>
                                    <td className='py-2'>URL: Slug<b className='text-danger'>*</b></td>
                                    <td className='py-2'><b>:</b></td>
                                    <td className='py-2'>
                                        <div className='flex items-center border rounded-md border-gray-300'>
                                            <div className='p-2 h-full text-red-500 font-bold bg-[#eeeeee]'>https://fshoppii.com/</div>
                                            <input className='outline-none p-2 border focus:border-blue-500 w-full' type='text' required autoComplete='off' />
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Meta Title<b className='text-danger'>*</b></td>
                                    <td className='py-2'><b>:</b></td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full' type='text' required autoComplete='off' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Meta Description</td>
                                    <td className='py-2'><b>:</b></td>
                                    <td className='py-2'>
                                        <textarea className='outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full' rows={2} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Meta keyword</td>
                                    <td className='py-2'><b>:</b></td>
                                    <td className='py-2'>
                                        <textarea className='outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full' rows={2} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='rounded-md p-3 outline-none bg-[#347ab6] text-white' value='Xác Nhận' />
                                            <input type='reset' className='rounded-md p-3 outline-none bg-[#eeeeee]' value='Nhập Lại' />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* </form> */}
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductAddForm