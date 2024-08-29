/* istanbul ignore file */
const logger = require('../lib/logger');

const ApiError = require('../error/apiError');

// eslint-disable-next-line no-unused-vars
function apiErrorHandler(err, req, res, next) {
	const errorMessage = {
		code: null,
		errors: null
	};

	logger.error(err);

	if (err instanceof ApiError) {
		errorMessage.code = err.code;
		errorMessage.errors = err.message.errors;
		return res.status(err.code).json(errorMessage);
	}

	const internalServerError = ApiError.internalServerError(
		'Unexpected internal server error while handling API call'
	);
	errorMessage.code = internalServerError.code;
	errorMessage.errors = internalServerError.message.errors;

	return res.status(500).json(errorMessage);
}

module.exports = apiErrorHandler;
