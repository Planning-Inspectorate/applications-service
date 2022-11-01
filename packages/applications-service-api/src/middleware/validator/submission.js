const config = require('../../lib/config');
const ApiError = require('../../error/apiError');
const { createRequestValidator } = require('../../utils/openapi');

const validator = createRequestValidator('POST', '/api/v1/submissions/{caseReference}');

const validateRequest = (req, res, next) => {
	const errors = validator.validateRequest(req);

	if (errors) {
		throw ApiError.badRequest(
			errors.errors.map((e) => {
				if (e.errorCode.includes('maxLength')) {
					return `'${e.path}' ${e.message.toLowerCase()}`;
				}
				return e.message;
			})
		);
	}

	if (!req.body.representation && !req.file) {
		throw ApiError.badRequest("must have required property 'representation' or 'file'");
	}

	if (req.body.representation && req.file) {
		throw ApiError.badRequest("must have only one of property 'representation' or 'file'");
	}

	if (req.file) {
		if (!Object.values(config.uploads.allowedFileTypes).includes(req.file.mimeType)) {
			throw ApiError.badRequest(
				`file type must be one of ${Object.keys(config.uploads.allowedFileTypes)}`
			);
		}
	}

	next();
};

module.exports = {
	validateRequest
};
