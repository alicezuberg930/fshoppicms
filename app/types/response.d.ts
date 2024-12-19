interface ArrayAPIResponse<Type> {
    status: string,
    statusCode: number,
    message: string,
    data?: {
        data?: Type,
        total?: number,
        totalPages?: number,
        currentPage?: number
    }
}

interface SingleAPIResponse<Type> {
    status?: string,
    statusCode?: number,
    message?: string,
    data?: Type
}
