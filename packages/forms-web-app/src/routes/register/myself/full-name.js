const express = require('express');

const { decodeUri } = require('../../../middleware/decode-uri');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { rules: fullNameValidationRules } = require('../../../validators/shared/full-name');
const { get, post } = require('../../../controllers/register/common/full-name');

const router = express.Router();

router.get('/full-name', get);

router.post(
	'/full-name',
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	post
);

module.exports = router;
