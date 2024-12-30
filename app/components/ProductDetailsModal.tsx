'use client'
import { formatVND } from '../common/utils';

const ProductDetailsModal: React.FC<{
    product?: Product, setSelected: (v: Product | null) => void, setShow: (v: boolean) => void,
}> = ({ product, setSelected, setShow }) => {

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>Thông tin sản phẩm</h3>
                </div>
                <div className='p-3'>
                    <div className=''>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Phân loại sản phẩm</td>
                                </tr>

                                <tr>
                                    <td className='py-3 px-2 w-36'>Thương hiệu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        {/* <span>{product?.category}</span> */}
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Thông tin sản phẩm</td>
                                </tr>

                                <tr>
                                    <td className='py-3 px-2 w-36'>Hình</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <div className="flex flex-wrap overflow-scroll gap-2 h-72">
                                                {
                                                    product?.images?.map((image, i) => {
                                                        return (
                                                            <object
                                                                key={i}
                                                                className="object-cover rounded-md w-full max-w-64 h-72"
                                                                data={image}
                                                                type="image/png"
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 px-2 w-36'>Mã sản phẩm</td>
                                    <td className='py-3'>
                                        {/* <span>{product?.productCode}</span> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 px-2 w-36'>Tên Sản Phẩm</td>
                                    <td className='py-3'>
                                        <span>{product?.name}</span>
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
                                    <td className='py-3 px-2 w-36'>Biến thể</td>
                                    <td className='py-3'>
                                        {
                                            <div className=''>
                                                {
                                                    product!.options!.map((variant, i) => {
                                                        return (
                                                            <div key={i}>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Giá bán</td>
                                </tr>
                                <tr>
                                    <td className='py-3 px-2 w-36'>Giá bán</td>
                                    <td className='py-3'>
                                        <span>{formatVND(+product?.price!)}</span>
                                    </td>
                                </tr>


                                <tr>
                                    <td className='py-3 px-2 w-36'>Tồn kho</td>
                                    <td className='py-3'>
                                        <span>{product?.stock}</span>
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
                                    <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Chi tiết sản phẩm</td>
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
                                    <td className='py-3 px-2 w-36'>Chi tiết sản phẩm</td>
                                    <td className='py-3'>
                                        <span>{product?.description}</span>
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
                                    <td colSpan={2}>
                                        <div className='space-x-3 font-bold text-md'>
                                            <button onClick={() => { setSelected(null); setShow(false) }} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ProductDetailsModal