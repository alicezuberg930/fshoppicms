"use client"
import { icons } from "@/app/common/icons"
import "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { useRef, useState } from "react";
import { ChartOptions } from "chart.js/auto";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData } from 'chart.js';
import Link from "next/link";
import moment from "moment";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardPage: React.FC = () => {
    const { FaArrowDown, FaArrowUp, FaChevronDown, FaRegShareSquare } = icons
    const [chartData, setChartData] = useState<{}>({})
    const chartRef = useRef()
    const [tooltipData, setTooltipData] = useState({ opacity: 0, top: 0, left: 0 })
    const [selectedSong, setSelectedSong] = useState(null)
    const data: ChartData<"bar", number[], string> = {
        labels: ['1/2024', '2/2024', '3/2024', '4/2024', '5/2024', '6/2024', '7/2024', '8/2024', '9/2024', '10/2024'],
        datasets: [
            {
                label: 'Sales',
                data: [30, 50, 40, 76, 55, 85, 55, 15, 60, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderWidth: 1,
                barThickness: 20, // Set thinner bar width (default: auto)
            },
        ],
    };

    const dummy: number[] = [];
    for (let i = 0; i <= 5; i++) {
        dummy.push(i)
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        // hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)', // Color on hover
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        hover: { mode: 'dataset', intersect: false }
    };

    const doughtnutData = {
        labels: ['16-25', '26-35', '>36'], // Legends
        datasets: [
            {
                label: 'Nhóm tuổi',
                data: [50, 30, 20], // Values for each category
                backgroundColor: [
                    'rgba(75, 75, 192, 1)', // Blue for 16-25
                    'rgba(50, 205, 50, 1)', // Green for 26-35
                    'rgba(255, 0, 0, 1)',   // Red for >36
                ],
                hoverBackgroundColor: [
                    'rgba(75, 75, 192, 0.8)',
                    'rgba(50, 205, 50, 0.8)',
                    'rgba(255, 0, 0, 0.8)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const doughnutOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom', // Move legend to bottom
                labels: {
                    usePointStyle: true, // Circular points
                    padding: 15,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        cutout: '60%', // Makes the center hollow
    };


    return (
        <main className="h-full bg-gray-100">
            <div className="py-5 px-2 md:px-6">
                <div className="w-full flex gap-4 flex-col md:flex-row">
                    <div className="w-full md:w-[70%]">
                        <div className="flex flex-col sm:flex-row gap-4 text-white">
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
                        <div className="w-full mt-4 bg-white rounded-xl px-3 py-6 shadow-md">
                            <div className="flex justify-between">
                                <span className="text-xl font-bold flex-1">Thống kê doanh số</span>
                                <select className='p-2 rounded-xl outline-none bg-gray-200' autoComplete='off'>
                                    <option value="">Quý 1 - 2024</option>
                                    <option value="">Quý 2 - 2024</option>
                                </select>
                            </div>
                            <Bar data={data} options={options} className="mt-4 w-fit" />
                            {/* {<Line data={data} ref={chartRef} options={options} />} */}
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] bg-white rounded-xl px-3 py-6 shadow-md">
                        <div className="flex justify-between">
                            <span className="text-xl font-bold flex-1">Khách hàng</span>
                            <select className='p-2 rounded-xl outline-none bg-gray-200' autoComplete='off'>
                                <option value="">Tuổi</option>
                                <option value="">Tuổi</option>
                            </select>
                        </div>
                        <Doughnut data={doughtnutData} options={doughnutOptions} className="mt-4 w-fit" />
                    </div>
                </div>
                <div className="shadow md:rounded-lg min-w-full align-middle rounded-xl mt-4">
                    <table className="border-collapse border-spacing-0 overflow-hidden rounded-lg divide-y divide-gray-200 min-w-full">
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
                                                {/* <Link href={`/cms/orders/details/NX${2411080009 * i}`} className="flex items-center bg-blue-300 hover:bg-blue-700 active:bg-blue-600 p-2 border border-transparent rounded-lg font-medium text-center text-sm text-white leading-5 transition-colors duration-150" title="Delete">
                                                    <FaRegShareSquare className='w-5 h-5' />
                                                </Link> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default DashboardPage