const { createRequestValidator } = require('../../utils/openapi');
const ApiError = require('../../error/apiError');

const validateRequestWithOpenAPI = (req, res, next) => {
	const validator = createRequestValidator(req.method, `${req.baseUrl}${req.route.path}`);

	const errors = validator.validateRequest(req);

	if (errors) {
		throw ApiError.badRequest(
			errors.errors.map((e) => {
				if (
					e.errorCode &&
					e.errorCode.match(/(maxLength|minLength|type|enum)\.openapi\.requestValidation/)
				) {
					return `'${e.path}' ${e.message.toLowerCase()}`;
				}
				return e.message;
			})
		);
	}

	next();
};

module.exports = {
	validateRequestWithOpenAPI
};
