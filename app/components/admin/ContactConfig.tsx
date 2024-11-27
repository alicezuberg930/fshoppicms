const ContactConfiguration: React.FC<{ i: number }> = ({ i }) => {
    return (
        <tr>
            <td className='py-2'>Contact {i}</td>
            <td className='py-2'><b>:</b></td>
            <td className='py-2'>
                <div className="grid font-semibold text-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="table">
                        <div className='table-cell w-[1%] whitespace-nowrap rounded-l-md p-2 text-red-500 bg-[#eeeeee]'>Tiêu đề</div>
                        <input className="table-cell w-full rounded-r-md border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>
                    <div className="table">
                        <div className='table-cell w-[1%] whitespace-nowrap rounded-l-md p-2 text-red-500 bg-[#eeeeee]'>Điện thoại</div>
                        <input className="table-cell w-full rounded-r-md border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>
                    <div className="table">
                        <div className='table-cell w-[1%] whitespace-nowrap rounded-l-md p-2 text-red-500 bg-[#eeeeee]'>Email</div>
                        <input className="table-cell w-full rounded-r-md border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default ContactConfiguration