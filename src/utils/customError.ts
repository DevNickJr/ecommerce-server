class CustomError extends Error {
    public status: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.name = 'Custom Error'
        this.status = statusCode || 400
    }
}

export default CustomError