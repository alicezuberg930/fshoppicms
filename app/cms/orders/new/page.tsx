import { icons } from "@/app/common/icons";
import moment from "moment";
import Link from "next/link";

const AdminPage: React.FC = () => {
    const { FaRegShareSquare, FaChevronDown } = icons

    const dummy: number[] = [];
    for (let i = 0; i <= 100; i++) {
        dummy.push(i)
    };

    return (
        <>
            <main className="h-full">
                <div className="mt-5 mb-5 px-6">
                    <div className="flex justify-between items-center mb-2 font-semibold text-2xl">
                        <h2>Danh sách đặt hàng</h2>
                        {/* <div className="flex gap-2">
                            <button className="flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white">
                                <IoIosAddCircleOutline className="w-5 h-5" />
                                <span>Thêm mới</span>
                            </button>
                            <button className="flex items-center gap-1 bg-red-600 px-4 py-2 rounded-xl font-medium text-sm text-white">
                                <FaRegTrashAlt className="w-5 h-5" />
                                <span>Xóa</span>
                            </button>
                        </div> */}
                    </div>
                    <div className="flex-col">
                        <div className="space-y-4">
                            <div className="flex lg:flex-row flex-col justify-between gap-2">
                                <div className="border-gray-300 border rounded-md font-semibold text-gray-600 text-sm table">
                                    <Link href="/login" className="border-gray-300 px-3 py-2 border-r w-[1%] whitespace-nowrap align-middle table-cell">
                                        Đơn hàng mới
                                    </Link>
                                    <Link href="/login" className="border-gray-300 px-3 py-2 border-r w-[1%] whitespace-nowrap align-middle table-cell">
                                        <span>Đang xử lý</span>
                                    </Link>
                                    <Link href="/login" className="border-gray-300 px-3 py-2 border-r w-[1%] whitespace-nowrap align-middle table-cell">
                                        <span>Thành công</span>
                                    </Link>
                                    <Link href="/cms/orders/new" className="px-3 py-2 w-[1%] whitespace-nowrap align-middle table-cell">
                                        <span>Tất cả</span>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="shadow-sm border rounded-md">
                                        <input placeholder="Tìm kiếm" type="text" className="block focus:border-indigo-300 shadow-sm focus:shadow-blue-300 p-2 rounded-md sm:text-sm sm:leading-5 focus:outline-none" />
                                    </div>
                                    <div className="shadow-sm border rounded-md">
                                        <select className="block border-gray-300 focus:border-indigo-300 focus:shadow-blue-300 py-2 pr-10 pl-3 border w-full text-base leading-6 focus:outline-none sm:text-sm">
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
                            <div className="shadow rounded-none md:rounded-lg min-w-full align-middle">
                                <table className="divide-y divide-gray-200 min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-50 px-3 py-2 md:py-3 w-36">
                                                <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                    <span>Code</span>
                                                </button>
                                            </th>
                                            <th className="hidden bg-gray-50 px-3 py-2 md:py-3 w-1/3 lg:table-cell">
                                                <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                    <span>Thông tin người mua</span>
                                                </button>
                                            </th>
                                            <th className="bg-gray-50 px-3 py-2 md:py-3">
                                                <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                    <span>Tổng tiền</span>
                                                    <span className="relative flex items-center">
                                                        <FaChevronDown className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="bg-gray-50 px-3 py-2 md:py-3">
                                                <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                    <span>Ngày đặt</span>
                                                    <span className="relative flex items-center">
                                                        <FaChevronDown className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="bg-gray-50 px-3 py-2 md:py-3">
                                                <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                    <span>Trạng thái</span>
                                                </button>
                                            </th>
                                            <th className="hidden bg-gray-50 px-3 py-2 md:py-3 lg:table-cell">
                                                <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                    <span>Thanh toán</span>
                                                </button>
                                            </th>
                                            <th className="bg-gray-50 px-3 py-2 md:py-3 w-12">
                                                <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
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
                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">NX{2411080009 * i}</span>
                                                            </div>
                                                        </td>

                                                        <td className="hidden px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal lg:table-cell">
                                                            <div className="line-clamp-3 text-ellipsis text-gray-700 overflow-hidden">
                                                                <a href="https://fshoppii.com/cms/cart/view/10/nx2411080010/">
                                                                    <h4>
                                                                        <b className="text-primary">Tiến Nguyễn Vĩnh</b> - <b>Phone: 0932430072</b>
                                                                    </h4>
                                                                    <p><b>Địa chỉ: </b>Ho Chi Minh City, Viet Nam</p>
                                                                    <p className="font-semibold text-green-700">Chuyển khoản ngân hàng</p>
                                                                </a>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{100000 * i}đ</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{moment().format('HH:mm D/M/YYYY')}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-white text-xs">
                                                                {
                                                                    i % 2 == 0 ?
                                                                        <span className="bg-blue-300 p-1.5 rounded-md">Đơn hàng mới</span>
                                                                        : i % 3 == 0 ?
                                                                            <span className="bg-[#347ab6] p-1.5 rounded-md">Đang xử lý</span>
                                                                            : i % 5 == 0 ?
                                                                                <span className="bg-[#5eb95b] p-1.5 rounded-md">Thành công</span>
                                                                                :
                                                                                <span className="bg-red-500 p-1.5 rounded-md">Thất bại</span>
                                                                }
                                                            </div>
                                                        </td>

                                                        <td className="hidden px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal lg:table-cell">
                                                            <div className="text-white text-xs">
                                                                {
                                                                    i % 2 == 0 ?
                                                                        <span className="bg-[#5eb95b] p-1.5 rounded-md">Đã thanh toán</span> :
                                                                        <span className="bg-red-500 p-1.5 rounded-md">Chưa thanh toán</span>
                                                                }
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <Link href={`/cms/orders/details/NX${2411080009 * i}`} className="flex items-center bg-blue-300 hover:bg-blue-700 active:bg-blue-600 p-2 border border-transparent rounded-lg font-medium text-center text-sm text-white leading-5 transition-colors duration-150" title="Delete">
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
