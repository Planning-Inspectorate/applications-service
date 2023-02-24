const { StatusCodes } = require('http-status-codes');

class ApiError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	static badRequest(...messages) {
		return new ApiError(StatusCodes.BAD_REQUEST, { errors: messages.flat() });
	}

	static notFound(message) {
		return new ApiError(StatusCodes.NOT_FOUND, { errors: [message] });
	}

	static internalServerError(message) {
		return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, { errors: [message] });
	}

	static applicationNotFound(id) {
		return this.notFound(`Application ${id} was not found`);
	}

	static applicationNotAcceptable(id) {
		return new ApiError(StatusCodes.NOT_ACCEPTABLE, {
			errors: [`Application ${id} is not eligible`]
		});
	}

	static noApplicationsFound() {
		return this.notFound('No applications found');
	}

	static interestedPartyNotFound(caseRef) {
		return this.notFound(`Interested party for project ${caseRef} not found`);
	}

	static noDocumentsFound() {
		return this.notFound('No documents found');
	}

	static interestedPartyNotFoundByID(id) {
		return this.notFound(`Interested party ${id} not found`);
	}

	static noRepresentationsFound() {
		return this.notFound('No representations found');
	}

	static representationNotFound(id) {
		return this.notFound(`Representation with ID ${id} not found`);
	}

	static adviceNotFound(id) {
		return this.notFound(`Advice with ID ${id} not found`);
	}
}

module.exports = ApiError;
