import { Dispatch } from "react"
import { icons } from "../common/icons"
import { SetStateAction } from "react"

const CustomPaginator: React.FC<{ currentPage: number, totalPage: number, setCurrentPage: Dispatch<SetStateAction<number>> }> = ({ currentPage = 1, totalPage, setCurrentPage }) => {
    const { FaChevronLeft, FaChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight, BsThreeDots } = icons
    // Calculate the range of pages to display
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPage, currentPage + 3);

    return (
        <div className='text-center select-none'>
            <span className='relative z-0 inline-flex rounded-md shadow-sm'>
                {
                    currentPage > 1 ?
                        <>
                            <span onClick={() => setCurrentPage(1)}>
                                <button className='relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:text-gray-400'>
                                    <HiChevronDoubleLeft className='w-5 h-5 p-1' />
                                </button>
                            </span>
                            <span onClick={() => setCurrentPage(currentPage - 1)}>
                                <button className='relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:text-gray-400 -ml-px'>
                                    <FaChevronLeft className='w-5 h-5 p-1' />
                                </button>
                            </span>
                        </> : <></>
                }
                {
                    currentPage > 4 ?
                        <span>
                            <button className='relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:text-gray-400 -ml-px'>
                                <BsThreeDots className='w-5 h-5 p-1' />
                            </button>
                        </span> : <></>
                }
                {/* Display only 3 previous pages and 3 next pages if the current page exceeds 4 */}
                {
                    Array.from({ length: totalPage }, (_, i) => i + 1).filter(page => page >= startPage && page <= endPage).map(page => (
                        <span key={page}>
                            <button onClick={() => setCurrentPage(page)} className={`relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border hover:text-gray-400 ${currentPage === page ? "border-blue-300 z-10" : "border-gray-300"}`}>
                                {page}
                            </button>
                        </span>
                    ))
                }
                {
                    currentPage < totalPage - 3 ?
                        <span>
                            <button className='relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:text-gray-400 -ml-px'>
                                <BsThreeDots className='w-5 h-5 p-1' />
                            </button>
                        </span> : <></>
                }
                {
                    currentPage < totalPage ?
                        <>
                            <span onClick={() => setCurrentPage(currentPage + 1)}>
                                <button className='relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:text-gray-400 -ml-px'>
                                    <FaChevronRight className='w-5 h-5 p-1' />
                                </button>
                            </span>
                            <span onClick={() => setCurrentPage(totalPage)}>
                                <button className='relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:text-gray-400 -ml-px'>
                                    <HiChevronDoubleRight className='w-5 h-5 p-1' />
                                </button>
                            </span>
                        </> : <></>
                }
            </span>
        </div>
    )
}

export default CustomPaginator