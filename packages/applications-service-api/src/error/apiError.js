class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static applicationNotFound(id) {
    return new ApiError(404, { errors: [`Application ${id} was not found`] });
  }

  static applicationNotAcceptable(id) {
    return new ApiError(406, { errors: [`Application ${id} is not eligible`] });
  }

  static noApplicationsFound() {
    return new ApiError(404, { errors: [`No applications found`] });
  }

  static interestedPartyNotFound(caseRef) {
    return new ApiError(404, { errors: [`Interested party for projet ${caseRef} not found`] });
  }
}

module.exports = ApiError;
