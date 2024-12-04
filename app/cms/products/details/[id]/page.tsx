// "use client"
import "@/public/css/custom.css"
import moment from "moment"
import Image from "next/image"

const ProductDetailsPage = () => {
    // const id = (await params).id
    return (
        <>
            <div className='w-full'>
                <div className=''>
                    <div className='bg-[#f5f5f5] p-3'>
                        <h3 className='font-semibold text-red-500'>Thông tin đơn hàng: {123}</h3>
                    </div>
                    <div className='p-3'>
                        <form className='' >
                            <table className='w-full text-sm'>
                                <tbody>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Mã đơn hàng</td>
                                        <td className='py-3'>
                                            <span className="font-semibold text-red-900">{24}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Trạng thái đơn</td>
                                        <td className='py-3'>
                                            <div className="text-white">
                                                <span className="bg-blue-300 p-1.5 rounded-md">Đơn hàng mới</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Giá trị đơn</td>
                                        <td className='py-3'>
                                            <span className="font-semibold text-red-900">150.000 VNĐ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Ngày đặt</td>
                                        <td className='py-3'>
                                            <span className="">{moment().format('HH:mm D/M/YYYY')}</span>
                                        </td>
                                    </tr>

                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Thông tin người mua</td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Họ tên</td>
                                        <td className='py-3'>
                                            <span className="">Nguyen vinh tien</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Địa chỉ</td>
                                        <td className='py-3'>
                                            <span className="">64 ly thuong kiet p7 q8 tphcm</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Điện thoại</td>
                                        <td className='py-3'>
                                            <span className="">09249731014</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Email</td>
                                        <td className='py-3'>
                                            <span className="">tehhe234@gmail.com</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Yêu cầu</td>
                                        <td className='py-3'>
                                            <span className="">frtgyhuytgt gt3yujyhrtgr heyujrhytegrwf yhuyrtegrfwe</span>
                                        </td>
                                    </tr>

                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Thông tin thanh toán</td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Giá trị đơn hàng</td>
                                        <td className='py-3'>
                                            <span className="">753.000 VNĐ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Hình thức</td>
                                        <td className='py-3'>
                                            <span className="font-semibold text-[#347ab6]">COD - thanh toán khi nhận hàng</span>
                                            <p>Quý khách vui lòng thanh toán dựa trên hoá đơn bán hàng</p>
                                        </td>
                                    </tr>

                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Ghi chú đơn hàng</td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Ghi chú</td>
                                        <td className='py-3'>
                                            <span className="">fbeiw wriue ierue eriufhgiqee qeoir oeiqrfioqer quirfqr</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* chi tiết sản phẩm */}
                            <table className="text-sm w-full mt-6">
                                <tbody>
                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={5} className='py-3 px-2 uppercase font-bold text-sm'>Thông tin sản phẩm</td>
                                    </tr>
                                    <tr className="font-semibold">
                                        <td className='py-3 px-2 w-28'>Hình SP</td>
                                        <td className='py-3 px-2'>Thông tin sản phẩm</td>
                                        <td className='py-3 text-center'>Số lượng</td>
                                        <td className='py-3 text-right'>Giá bán</td>
                                        <td className='py-3 px-2 text-right'>Thành tiền</td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2'>
                                            <Image alt="" className="rounded-md border" width={84} height={84} src="https://fshoppii.com/uploads/products/cau-dao-tu-dong-mcb-panasonic-10a-bbd2102cnv-202401281721.webp" />
                                        </td>
                                        <td className='py-3 px-2'>
                                            <span className="font-semibold">Cầu dao tự động MCB Panasonic 10A BBD2102CNV</span>
                                            <p>Mã SP: MCB Panasonic 10A BBD2102CNV</p>
                                        </td>
                                        <td className='py-3 text-center'>54</td>
                                        <td className='py-3 text-right'>253.000</td>
                                        <td className='py-3 px-2 text-right font-semibold'>593.000</td>
                                    </tr>
                                    <tr className="bg-blue-200">
                                        <td colSpan={4} className="py-3 uppercase font-semibold text-right">Tạm tính</td>
                                        <td className="text-right py-3 px-2 font-semibold">456.000</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* xử lý sản phẩm */}
                            <table className='w-full text-sm mt-6'>
                                <tbody>
                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Xử lý đơn hàng</td>
                                    </tr>

                                    <tr>
                                        <td className='py-3 px-2 w-36'>Trạng thái đơn</td>
                                        <td className='py-3'>
                                            <div className='flex flex-wrap gap-2 text-white text-xs'>
                                                <label className='bg-[#5ac0dd] p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='1' name='tinhtrang' defaultChecked />
                                                    <b>Đơn hàng mới</b>
                                                </label>
                                                <label className='bg-[#347ab6] p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='9' name='tinhtrang' />
                                                    <b>Đang xử lý</b>
                                                </label>
                                                <label className='bg-[#5eb95b] p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='2' name='tinhtrang' />
                                                    <b>Thành công</b>
                                                </label>
                                                <label className='bg-red-500 p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='3' name='tinhtrang' />
                                                    <b>Không thành công</b>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Ghi chú</td>
                                        <td className='py-3'>
                                            <textarea className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={5} placeholder="Ghi chú đơn hàng" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td>
                                            <div className='space-x-3 font-bold text-md'>
                                                <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Lưu thông tin' />
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

export default ProductDetailsPage