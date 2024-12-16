import path from "path"
import { icons } from "./icons"
import { PATH } from "./path"

const { MdFileUpload, BiCategory, PiFlagBanner, MdOutlinePayment, MdOutlinePayments, FaUser, FaBoxOpen, CiShoppingBasket, PiShippingContainer, VscSettings, LuLayoutDashboard } = icons

const menuItems = [
    {
        isParent: false,
        name: "Dashboard",
        path: PATH.DASHBOARD,
        icon: <LuLayoutDashboard className='w-5 h-5' />
    },
    {
        isParent: false,
        name: "Danh mục",
        path: PATH.CATEGORIES,
        icon: <BiCategory className='w-5 h-5' />
    },
    {
        isParent: false,
        name: "Banner",
        path: PATH.BANNERS,
        icon: <PiFlagBanner className='w-5 h-5' />
    },
    {
        isParent: false,
        name: "Người dùng",
        path: PATH.USERS,
        icon: <FaUser className='w-5 h-5' />
    },
    {
        isParent: false,
        name: "Tải ảnh lên cloud",
        path: PATH.UPLOAD_FILES,
        icon: <MdFileUpload className="w-5 h-5" />
    },
    {
        isParent: true,
        name: "Đơn hàng",
        icon: <PiShippingContainer className="w-5 h-5" />,
        toggleType: "isOrder",
        children: [
            {
                name: "Đơn hàng mới",
                path: PATH.ORDERS_NEW,
                icon: <PiShippingContainer className='w-5 h-5' />,
            },
            {
                name: "Đơn hàng đang xử lý",
                path: PATH.ORDERS_ALL,
                icon: <PiShippingContainer className='w-5 h-5' />
            },
            {
                name: "Đơn hàng thành công",
                path: PATH.ORDERS_ALL,
                icon: <PiShippingContainer className='w-5 h-5' />
            },
            {
                name: "Tất cả đơn hàng",
                path: PATH.ORDERS_ALL,
                icon: <PiShippingContainer className='w-5 h-5' />
            },
        ]
    },
    {
        isParent: true,
        name: "Danh sách sản phẩm",
        icon: <FaBoxOpen className='w-5 h-5' />,
        toggleType: "isProduct",
        children: [
            {
                name: "Sản phẩm đang bán",
                path: PATH.PRODUCT_CURRENT,
                icon: <FaBoxOpen className='w-5 h-5' />,
            },
            {
                name: "Đang giảm giá",
                path: PATH.PRODUCT_CURRENT,
                icon: <FaBoxOpen className='w-5 h-5' />
            },
            {
                name: "Sản phẩm đang ẩn",
                path: PATH.PRODUCT_CURRENT,
                icon: <FaBoxOpen className='w-5 h-5' />
            },
        ]
    },
    {
        isParent: true,
        name: "Cấu hình",
        icon: <VscSettings className='w-5 h-5' />,
        toggleType: "isConfig",
        children: [
            {
                name: "Cấu hình email",
                path: PATH.SITE_CONFIG,
                icon: <VscSettings className='w-5 h-5' />,
            },
            {
                name: "Cấu hình site",
                path: PATH.SITE_CONFIG,
                icon: <VscSettings className='w-5 h-5' />,
            }
        ]
    },
    {
        isParent: true,
        name: "Thanh toán",
        icon: <MdOutlinePayment className='w-5 h-5' />,
        toggleType: "isPayment",
        children: [
            {
                name: "Phương thức thanh toán",
                path: PATH.PAYMENT_METHODS,
                icon: <MdOutlinePayment className='w-5 h-5' />,
            },
            {
                name: "Lịch sử thanh toán",
                path: PATH.PAYMENT_METHODS,
                icon: <MdOutlinePayment className='w-5 h-5' />,
            }
        ]
    }
]

export default menuItems