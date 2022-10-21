const { StatusCodes } = require('http-status-codes');

class ApiError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	static badRequest(...messages) {
		return new ApiError(StatusCodes.BAD_REQUEST, { errors: messages.flat() });
	}

	static applicationNotFound(id) {
		return new ApiError(StatusCodes.NOT_FOUND, { errors: [`Application ${id} was not found`] });
	}

	static applicationNotAcceptable(id) {
		return new ApiError(StatusCodes.NOT_ACCEPTABLE, {
			errors: [`Application ${id} is not eligible`]
		});
	}

	static noApplicationsFound() {
		return new ApiError(StatusCodes.NOT_FOUND, { errors: [`No applications found`] });
	}

	static interestedPartyNotFound(caseRef) {
		return new ApiError(StatusCodes.NOT_FOUND, {
			errors: [`Interested party for project ${caseRef} not found`]
		});
	}

	static noDocumentsFound() {
		return new ApiError(404, { errors: [`No documents found`] });
	}

	static commentsForPartyWithIDNotUpdated(ID) {
		return new ApiError(StatusCodes.BAD_REQUEST, {
			errors: [`Failed to update comments for party with ID ${ID}`]
		});
	}

	static interestedPartyNotFoundByID(ID) {
		return new ApiError(StatusCodes.NOT_FOUND, {
			errors: [`Interested party ${ID} not found`]
		});
	}

	static noRepresentationsFound() {
		return new ApiError(StatusCodes.NOT_FOUND, { errors: [`No representations found`] });
	}

	static representationNotFound(id) {
		return new ApiError(StatusCodes.NOT_FOUND, {
			errors: [`Representation with ID ${id} not found`]
		});
	}
}

module.exports = ApiError;
