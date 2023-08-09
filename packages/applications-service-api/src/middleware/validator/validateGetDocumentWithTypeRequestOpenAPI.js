const { createRequestValidator } = require('../../utils/openapi');
const ApiError = require('../../error/apiError');

const validateGetDocumentWithTypeRequestOpenAPI = (req, res, next) => {
	const validator = createRequestValidator(req.method, `${req.baseUrl}${req.route.path}`);

	const capType = req.query.type.toUpperCase();
	const errors = validator.validateRequest({ ...req, query: { ...req.query, type: capType } });

	if (errors) {
		throw ApiError.badRequest(
			errors.errors.map((e) => {
				if (
					e.errorCode &&
					e.errorCode.match(/(enum|maxLength|minLength|pattern|type)\.openapi\.requestValidation/)
				) {
					return `'${e.path}' ${e.message}`;
				}
				return e.message;
			})
		);
	}

	next();
};

module.exports = {
	validateGetDocumentWithTypeRequestOpenAPI
};
