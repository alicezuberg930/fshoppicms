const ContactConfiguration: React.FC<{ i: number, contact: any }> = ({ i, contact }) => {
    return (
        <tr>
            <td className='py-2'>Contact {i}</td>
            <td className='py-2'>
                <div className="contact grid text-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="table">
                        <div className='font-semibold table-cell w-[1%] whitespace-nowrap rounded-l-md p-2 text-red-500 bg-[#eeeeee]'>Tiêu đề</div>
                        <input defaultValue={contact.label} className="table-cell w-full rounded-r-md border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>
                    <div className="table">
                        <div className='font-semibold  table-cell w-[1%] whitespace-nowrap rounded-l-md p-2 text-red-500 bg-[#eeeeee]'>Điện thoại</div>
                        <input defaultValue={contact.phone} className="table-cell w-full rounded-r-md border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>
                    <div className="table">
                        <div className='font-semibold  table-cell w-[1%] whitespace-nowrap rounded-l-md p-2 text-red-500 bg-[#eeeeee]'>Email</div>
                        <input defaultValue={contact.email} className="table-cell w-full rounded-r-md border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default ContactConfiguration