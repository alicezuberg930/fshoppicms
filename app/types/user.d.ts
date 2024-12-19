interface User {
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    phone?: string,
    // extras
    _id?: string,
    isAdmin?: boolean,
    role?: string,
    isLocked?: boolean,
    // orders: []
    createdAt?: string,
    updatedAt?: string,
    access_token?: string
}