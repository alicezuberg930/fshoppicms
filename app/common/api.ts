export const API = {
    // admin
    LOCK: "/admin/lock",
    UNLOCK: "/admin/unlock",
    // common
    LOGIN: "/.netlify/functions/login",
    UPLOAD_FILE: "/files/upload/image",
    PROFILE: "/.netlify/functions/get_profile",
    // CRUD user
    CREATE_USER: "/user/create",
    READ_USERS: "/admin/getUsers",
    // CRUD Product 
    CREATE_PRODUCT: "/.netlify/functions/create_product",
    READ_PRODUCTS: "/.netlify/functions/getlist",
    DELETE_PRODUCT: "/.netlify/functions/delete_product",
    UPDATE_PRODUCT: "/product/update",
    // CRUD category
    CREATE_CATEGORY: "/category/create",
    READ_CATEGORIES: "/.netlify/functions/func_allCategory",
    UPDATE_CATEGORY: "???",
    DELETE_CATEGORY: "/category/del",
    // CRUD Sub categories
    READ_SUBCATEGORIES: "/.netlify/functions/func_getbyparentCategory",
    // Kho 
    READ_STORAGE: "/storage",
    // CRUD brand
    CREATE_BRAND: "/.netlify/functions/func_createBrand",
    READ_BRANDS: "/.netlify/functions/func_allBrand",
    UPDATE_BRAND: "",
    DELETE_BRAND: "/.netlify/functions/func_deleteBrand",
    // CONFIG
    CONFIGS: "https://learning-nestjs-ediw.onrender.com/api/v1/configs"
}