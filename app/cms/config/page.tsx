"use client"
import React, { useReducer, useState } from "react";
import dynamic from "next/dynamic";
import ContactConfiguration from "@/app/components/ContactConfig";
const CustomCKEditor = dynamic(() => import('@/app/components/CKEditor'), {
    ssr: false // Prevents Editor.js from being included in server-side rendering
});

const ConfigurationPage: React.FC = () => {
    const [companyInfo, setCompanyInfo] = useState<string>("")

    return (
        <div className='w-full'>
            <div className=''>
                <div className='p-3 bg-[#f5f5f5]'>
                    <h3 className='text-red-500 font-semibold'>Thông tin công ty</h3>
                </div>
                <div className='p-3'>
                    <form className='' onSubmit={(e) => e.preventDefault()}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2} className='bg-primary'>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Thông tin công ty</td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Công ty<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Địa chỉ<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Tel/Điện thoại bàn<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' maxLength={11} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Hotline<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' maxLength={10} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Email chính<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' maxLength={10} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Giờ làm việc<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <textarea className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Footer: thông tin giới thiệu</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <textarea rows={5} className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Thông tin công ty/Footer</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <CustomCKEditor value={setCompanyInfo} defaultValue="Nhập mô tả bạn muốn" />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Footer: thông tin liên hệ</td>
                                </tr>

                                {
                                    [1, 2, 3, 4, 5, 6].map(contact => {
                                        return (
                                            <ContactConfiguration key={contact} i={contact} />
                                        )
                                    })
                                }

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Chat online</td>
                                </tr>

                                <tr>
                                    <td className='py-2'>URL: Zalo OA</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>URL: FB Messenger</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Mạng xã hội</td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Facebook</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Linkedin</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Youtube</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Instagram</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Online.gov.vn</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Google Maps</td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Google Maps</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <p className="p-3 bg-[#fdf8e3] rounded-lg mb-4 text-xs text-[#8e8359]">
                                            - Truy cập vào website <a href="https://www.google.com/maps/" className="font-bold text-red-400" target="_blank">https://www.google.com/maps/</a><br />
                                            - Search tìm vị trí trên bản đồ Google Maps (Nhập địa chỉ vào textbox search)<br />
                                            - Click Menu =&gt; Share =&gt; Popup Share xuất hiện =&gt; tab: Embed a map =&gt; click copy HTML
                                            <a href="https://fshoppii.com/assets/back/img/guild-googlemap.jpg" className="btn btn-xs btn-primary" target="_blank">
                                                <i className="fa fa-share-square"></i> Hình minh hoạ
                                            </a>
                                            <br />
                                            - Pase nội dùng vừa copy vào textbox bên dưới
                                        </p>
                                        <textarea rows={5} className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' />
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='rounded-md p-3 outline-none bg-[#347ab6] text-white' value='Xác Nhận' />
                                            <input type='reset' className='rounded-md p-3 outline-none bg-[#eeeeee]' value='Nhập Lại' />
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default ConfigurationPage