import { icons } from "@/app/common/icons"

const DashboardPage: React.FC = () => {
    const { FaArrowDown, FaArrowUp } = icons

    return (
        <main className="h-full">
            <div className="mt-5 mb-5 px-2 md:px-6">
                <div className="flex gap-4 h-full">
                    <div className="flex gap-4 w-[70%] bg-amber-100 text-white">
                        <div className="bg-fuchsia-300 flex-1 rounded-xl px-3 py-6 table">
                            <div className="flex-1 table-cell align-middle">
                                <h1 className="font-bold text-3xl">1249</h1>
                                <span className="text-lg">Đơn hàng</span>
                            </div>
                            <div className="flex-1 text-right table-cell align-middle">
                                <div className="">
                                    <div className="text-green-500 flex items-center justify-end">
                                        <FaArrowUp className="font-semibold h-4 w-4" />
                                        <span className="ml-1">+43%</span>
                                    </div>
                                    <span className="">Tháng trước</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-300 flex-1 rounded-xl px-3 py-6 table">
                            <div className="flex-1 table-cell align-middle">
                                <h1 className="font-bold text-3xl">539</h1>
                                <span className="text-lg">Khach hang</span>
                            </div>
                            <div className="flex-1 text-right table-cell align-middle">
                                <div className="">
                                    <div className="text-green-500 flex items-center justify-end">
                                        <FaArrowUp className="font-semibold h-4 w-4" />
                                        <span className="ml-1">+12%</span>
                                    </div>
                                    <span className="">Tháng trước</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-300 flex-1 rounded-xl px-3 py-6 table">
                            <div className="flex-1 table-cell align-middle">
                                <h1 className="font-bold text-3xl">12tr VND</h1>
                                <span className="text-lg">Tong thu nhap</span>
                            </div>
                            <div className="flex-1 text-right table-cell align-middle">
                                <div className="">
                                    <div className="text-red-500 flex items-center justify-end">
                                        <FaArrowDown className="font-semibold h-4 w-4" />
                                        <span className="ml-1">-33%</span>
                                    </div>
                                    <span className="">Tháng trước</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[30%] bg-slate-500 rounded-xl">

                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardPage