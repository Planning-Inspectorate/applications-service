class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static applicationNotFound(id) {
    return new ApiError(404, { errors: [`The application ${id} not found`] });
  }

  static interestedPartyNotFound(caseRef) {
    return new ApiError(404, { errors: [`Interested party for projet ${caseRef} not found`] });
  }
}

module.exports = ApiError;
