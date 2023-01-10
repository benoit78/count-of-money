class AppError extends Error {
  constructor(errorType) {
    super(errorType.type);

    const { type, statusCode, ...complementaryData } = errorType;

    this.statusCode = statusCode;
    this.type = type;
    this.complementaryData = { ...complementaryData };
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
