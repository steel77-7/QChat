class ApiResponse {
  constructor(statusCode, data) {
    this.success = statusCode < 400;
    this.status = statusCode;
    this.data = data;
  }
}

export default ApiResponse;
