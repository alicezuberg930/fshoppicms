const LoadingComponent: React.FC<{ isTet?: boolean }> = ({ isTet = true }) => {
    return (
        <>
            {isTet ?
                <div className="w-full">
                    <img src="/assets/tet-wallpaper.jpg" className="w-full" />
                </div> :
                <div className="animate-pulse" >
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div >
            }
        </>
    )
}

export default LoadingComponent