const { StatusCodes } = require('http-status-codes');

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(StatusCodes.BAD_REQUEST, msg);
  }

  static applicationNotFound(id) {
    return new ApiError(StatusCodes.NOT_FOUND, { errors: [`Application ${id} was not found`] });
  }

  static applicationNotAcceptable(id) {
    return new ApiError(StatusCodes.NOT_ACCEPTABLE, {
      errors: [`Application ${id} is not eligible`],
    });
  }

  static noApplicationsFound() {
    return new ApiError(StatusCodes.NOT_FOUND, { errors: [`No applications found`] });
  }

  static interestedPartyNotFound(caseRef) {
    return new ApiError(StatusCodes.NOT_FOUND, {
      errors: [`Interested party for project ${caseRef} not found`],
    });
  }

  static noDocumentsFound() {
    return new ApiError(404, { errors: [`No documents found`] });
  }
}

module.exports = ApiError;
