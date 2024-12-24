interface Category {
    _id?: string,
    name?: string,
    description?: string,
    parentCategory?: string | null,
    subcategories?: Category[],
    thumbnail?: string | null,
}