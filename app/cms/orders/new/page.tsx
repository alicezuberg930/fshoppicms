import { icons } from "@/app/common/icons";
import moment from "moment";
import Link from "next/link";

const AdminPage: React.FC = () => {
    const { FaFilter, FaRegShareSquare, FaRegTrashAlt, FaChevronDown, IoIosAddCircleOutline } = icons

    const dummy: number[] = [];
    for (let i = 0; i <= 100; i++) {
        dummy.push(i)
    };

    return (
        <>
            <main className="h-full">
                <div className="mt-5 mb-5 px-6">
                    <div className="flex items-center justify-between mb-2 text-2xl font-semibold">
                        <h2>Danh sách đặt hàng</h2>
                        {/* <div className="flex gap-2">
                            <button className="flex items-center text-sm font-medium rounded-xl bg-blue-300 gap-1 text-white py-2 px-4">
                                <IoIosAddCircleOutline className="w-5 h-5" />
                                <span>Thêm mới</span>
                            </button>
                            <button className="flex items-center text-sm font-medium rounded-xl bg-red-600 gap-1 text-white py-2 px-4">
                                <FaRegTrashAlt className="w-5 h-5" />
                                <span>Xóa</span>
                            </button>
                        </div> */}
                    </div>
                    <div className="flex-col">
                        <div className="space-y-4">
                            <div className="flex flex-col lg:flex-row justify-between gap-2">
                                <div className="font-semibold rounded-md table border border-gray-300 text-sm text-gray-600">
                                    <Link href="/cms/orders/new" className="py-2 px-3 border-r border-gray-300 table-cell w-[1%] whitespace-nowrap align-middle">
                                        Đơn hàng mới
                                    </Link>
                                    <Link href="/cms/orders/processing" className="py-2 px-3 border-r border-gray-300 table-cell w-[1%] whitespace-nowrap align-middle">
                                        <span>Đang xử lý</span>
                                    </Link>
                                    <Link href="/cms/orders/success" className="py-2 px-3 border-r border-gray-300 table-cell w-[1%] whitespace-nowrap align-middle">
                                        <span>Thành công</span>
                                    </Link>
                                    <Link href="/cms/orders" className="py-2 px-3 table-cell w-[1%] whitespace-nowrap align-middle">
                                        <span>Tất cả</span>
                                    </Link>
                                </div>
                                <div className="mb-4 md:mb-0 flex items-center gap-4">
                                    <div className="rounded-md shadow-sm border">
                                        <input placeholder="Tìm kiếm" type="text" className="p-2 shadow-sm block sm:text-sm sm:leading-5 focus:outline-none focus:border-indigo-300 focus:shadow-blue-300 rounded-md" />
                                    </div>
                                    <div className="rounded-md shadow-sm border">
                                        <select className="block w-full py-2 pl-3 pr-10 text-base leading-6 border border-gray-300 focus:outline-none focus:border-indigo-300 focus:shadow-blue-300 sm:text-sm">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="align-middle min-w-full shadow rounded-none md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50 w-36">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Code</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50 w-1/3 hidden lg:table-cell">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Thông tin người mua</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2  md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Tổng tiền</span>
                                                    <span className="relative flex items-center">
                                                        <FaChevronDown className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2  md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Ngày đặt</span>
                                                    <span className="relative flex items-center">
                                                        <FaChevronDown className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2  md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Trạng thái</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2  md:py-3 bg-gray-50  hidden lg:table-cell">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Thanh toán</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50 w-12">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Xem</span>
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            dummy.map((v, i) => {
                                                return (
                                                    <tr key={i} className="bg-white">
                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">NX{2411080009 * i}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900 hidden lg:table-cell">
                                                            <div className="text-gray-700 text-ellipsis overflow-hidden line-clamp-3">
                                                                <a href="https://fshoppii.com/cms/cart/view/10/nx2411080010/">
                                                                    <h4>
                                                                        <b className="text-primary">Tiến Nguyễn Vĩnh</b> - <b>Phone: 0932430072</b>
                                                                    </h4>
                                                                    <p><b>Địa chỉ: </b>Ho Chi Minh City, Viet Nam</p>
                                                                    <p className="text-green-700 font-semibold">Chuyển khoản ngân hàng</p>
                                                                </a>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{100000 * i}đ</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{moment().format('HH:mm D/M/YYYY')}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="text-xs text-white">
                                                                {
                                                                    i % 2 == 0 ?
                                                                        <span className="rounded-md p-1.5 bg-blue-300">Đơn hàng mới</span>
                                                                        : i % 3 == 0 ?
                                                                            <span className="rounded-md p-1.5 bg-[#347ab6]">Đang xử lý</span>
                                                                            : i % 5 == 0 ?
                                                                                <span className="rounded-md p-1.5 bg-[#5eb95b]">Thành công</span>
                                                                                :
                                                                                <span className="rounded-md p-1.5 bg-red-500">Thất bại</span>
                                                                }
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900 hidden lg:table-cell">
                                                            <div className="text-white text-xs">
                                                                {
                                                                    i % 2 == 0 ?
                                                                        <span className="rounded-md p-1.5 bg-[#5eb95b]">Đã thanh toán</span> :
                                                                        <span className="rounded-md p-1.5 bg-red-500">Chưa thanh toán</span>
                                                                }
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <Link href={`/cms/orders/details/${i}`} className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-300 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700" title="Delete">
                                                                <FaRegShareSquare className='w-5 h-5' />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {
                                /* <div className="p-6 md:p-0">
                                    {{ $products->links() }}
                                </div> */
                            }
                        </div>
                    </div>
                </div >
            </main >

        </>
    )
}

export default AdminPage
