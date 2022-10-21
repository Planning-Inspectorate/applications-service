const ApiError = require('../error/apiError');
const config = require('../lib/config');

// eslint-disable-next-line no-unused-vars
const fileUploadLimitHandler = (req, res, next) => {
	const fileSizeLimitInMegabytes = (config.uploads.fileSizeLimit / 1048576).toFixed(2);

	const error = ApiError.badRequest(`file size must be less than ${fileSizeLimitInMegabytes}MB`);

	return res.status(error.code).json({
		code: error.code,
		errors: error.message.errors
	});
};

module.exports = {
	fileUploadLimitHandler
};
