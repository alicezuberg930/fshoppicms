"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoadingOverlay } from "../services/common.slice"

const LoadingOverlay = () => {
    const { isLoading } = useSelector((state: any) => state.common)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsLoadingOverlay(false))
    }, [])

    return (
        <div className={`absolute select-none top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.3)] z-50 ${isLoading ? '' : 'hidden'}`}>
            <div className="w-full h-full relative">
                <Image
                    width={48} height={48}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src='/assets/loading_spinner.svg'
                    alt="loading spinner"
                    sizes="width: 100%, height: 100%"
                />
            </div>
        </div>
    )
}

export default LoadingOverlay