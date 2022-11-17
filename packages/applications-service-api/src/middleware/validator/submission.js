const config = require('../../lib/config');
const ApiError = require('../../error/apiError');
const { validateRequestWithOpenAPI } = require('./openapi');

const validateCreateSubmissionRequest = (req, res, next) => {
	validateRequestWithOpenAPI(req, res, next);

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
	validateCreateSubmissionRequest
};
