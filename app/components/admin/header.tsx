'use client'
import { useContext } from 'react';
import { useState } from "react"
import { AdminContext } from '@/app/hooks/admin.context';
import { icons } from '@/app/common/icons';

const Header: React.FC = () => {
    const [hideProfile, setHideProfile] = useState<boolean>(true)
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
    const { FaChevronDown, CiBellOn } = icons

    return (
        <header className="z-10 py-4 bg-white shadow-md">
            <div className="container flex items-center justify-between h-full px-6 mx-auto">
                <button className="p-1 rounded-md focus:outline-none text-blue-300"
                    onClick={() => { setCollapseMenu(!collapseMenu) }}
                >
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"></path>
                    </svg>
                </button>
                <div className="flex items-center flex-shrink-0 space-x-6">
                    <div className="relative">
                        <div className="flex items-center gap-5">
                            <div>
                                <div className="relative inline-block w-full">
                                    <select className="block w-full p-1 border border-blue-300 rounded text-blue-300" name="locale" id="locale">
                                        <option value="en">English</option>
                                        <option value="vi">Vietnamese</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => { }}>
                                <CiBellOn className='w-5 h-5' />
                            </button>
                            <button className="text-gray-500 flex items-center gap-2 focus:outline-none"
                                onClick={() => setHideProfile(!hideProfile)}
                            >
                                <img className="object-cover w-8 h-8 rounded-full"
                                    src="https://sobexpressacms.di4l.vn/images/user.png" alt="profile" />
                                <p className="hidden md:block">{"Hatsune Miku"}</p>
                                <FaChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                        <div>
                            <div className={`${hideProfile ? "hidden" : ""} absolute right-0 mt-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300`}
                                aria-label="submenu">
                                <div className="flex">
                                    <a className="inline-flex items-center w-full px-6 py-3 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                        href="https://sobexpressacms.di4l.vn/profile">
                                        <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                        <span>Profile</span>
                                    </a>
                                </div>
                                <div className="flex cursor-pointer">
                                    <div className="inline-flex items-center w-full px-6 py-3 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                        <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                        </svg>
                                        <span>Log out</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header