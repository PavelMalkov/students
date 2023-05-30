class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }
    // не найдено
    static badRequest(message) {
        return new ApiError(404, message)
    }
    // внутренняя проблема сервера
    static internal(message) {
        return new ApiError(500, message)
    }
    // запрещен доступ
    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError