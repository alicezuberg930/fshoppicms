import { icons } from "@/app/common/icons";

const BannersPage: React.FC = () => {
    const { MdCancel, IoIosAddCircleOutline, MdModeEdit, FaCheck, CiCircleCheck, FaRegTrashAlt } = icons

    const dummy = [
        {
            order: 1,
            active: true,
            image: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
        },
        {
            order: 2,
            active: true,
            image: "https://th.bing.com/th/id/OIP.TuEutBbaUWL2z6FHFUyhEQHaHZ?rs=1&pid=ImgDetMain"
        },
        {
            order: 5,
            active: true,
            image: "https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
        },
        {
            order: 3,
            active: false,
            image: "https://cardtot.com/wp-content/uploads/2020/01/zalopay.png"
        },
        {
            order: 4,
            active: true,
            image: "https://static.vecteezy.com/system/resources/previews/019/623/336/original/ewallet-icon-free-vector.jpg"
        },
        {
            order: 6,
            active: false,
            image: "https://cdn-icons-png.flaticon.com/512/8948/8948757.png"
        }
    ];

    return (
        <main className="h-full">
            <div className="py-5 px-2 md:px-6">
                <div className="flex justify-between items-center mb-2 font-semibold text-2xl">
                    <h2>Danh sách banner</h2>
                    <button className="flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white">
                        <IoIosAddCircleOutline className="w-5 h-5" />
                        <span>Thêm mới</span>
                    </button>
                </div>
                <div className="flex-col">
                    <div className="space-y-4">
                        <div className="flex lg:flex-row flex-col justify-between gap-2">
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
                                                <span>ID</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Thứ tự</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Ảnh</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Kích hoạt</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Hành động</span>
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
                                                            <span className="font-medium">{i}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                        <div className="text-gray-700">
                                                            <span className="font-medium">{v.order}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                        <div className="h-24 w-20">
                                                            <img className="object-cover w-full h-full" src={v.image ?? '/logo.png'} />
                                                        </div>
                                                    </td>

                                                    <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                        {v.active ?
                                                            <div className="text-green-500">
                                                                <CiCircleCheck className="w-5 h-5" />
                                                            </div> :
                                                            <div className="text-red-500">
                                                                <MdCancel className="w-5 h-5" />
                                                            </div>
                                                        }
                                                    </td>

                                                    <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                        <div className="flex flex-wrap justify-start gap-1">
                                                            <button className="p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none" title="Edit">
                                                                <MdModeEdit className="w-5 h-5" />
                                                            </button>
                                                            {v.active ?
                                                                <button className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700" title="Delete">
                                                                    <MdCancel className='w-5 h-5' />
                                                                </button> :
                                                                <button className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700" title="Delete">
                                                                    <FaCheck className='w-5 h-5' />
                                                                </button>
                                                            }
                                                            <button className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700" title="Delete">
                                                                <FaRegTrashAlt className='w-5 h-5' />
                                                            </button>
                                                        </div>
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
        </main>
    )
}

export default BannersPage