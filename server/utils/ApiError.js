class ApiError extends Error {
  constructor(
    statusCode,
    message = "Error occurred in the backend",
    data = null,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.status = statusCode;
    this.message = message
    this.data = data;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
