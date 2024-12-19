interface Category {
    _id?: string,
    name?: string,
    description?: string,
    parentCategory?: string | null,
    subcategories?: Category[],
    thumnail?: string | null,
}