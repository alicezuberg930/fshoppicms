export const PATH = {
    CATEGORIES: "/cms/categories",
    ORDERS_NEW: "/cms/orders/new",
    ORDERS_ALL: "/cms/orders",
    USERS: "/cms/users",
    PRODUCT_CURRENT: "/cms/products/current",
    SITE_CONFIG: "/cms/config/site",
    LOGIN: "/login",
    PROFILE: "/cms/profile"
}

export const API = {
    // admin
    LOCK: "/admin/lock",
    UNLOCK: "/admin/unlock",
    // common
    UPLOAD_FILE: "/files/upload/image",
    LOGIN: "/user/login",
    PROFILE: "/user/profile",
    // CRUD user
    CREATE_USER: "/user/create",
    READ_USER: "/admin/getUsers",
    // CRUD Product 
    CREATE_PRODUCT: "/product/create",
    READ_PRODUCTS: "/product/get_list",
    DELETE_PRODUCT: "/product/delete",
    UPDATE_PRODUCT: "/product/update",
    // CRUD category
    CREATE_CATEGORY: "/category/create",
    READ_CATEGORIES: "/category/all",
    UPDATE_CATEGORY: "???",
    DELETE_CATEGORY: "/category/del",
}