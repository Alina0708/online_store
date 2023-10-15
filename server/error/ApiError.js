class ApiError extends Error{

    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }

    static errorRequest(message){
        return new ApiError(404, message)
    }

    static forbidden(message){
        return new ApiError(403, message)
    }

    static internalServerError(message){
        return new ApiError(500, message)
    }


 
}

module.exports = ApiError;
