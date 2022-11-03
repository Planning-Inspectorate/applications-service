const express = require('express');

const roleController = require('../../../controllers/register/organisation/what-job-title-or-role');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { decodeUri } = require('../../../middleware/decode-uri');

const {
	rules: roleValidationRules
} = require('../../../validators/register/organisation/what-job-title-or-role');

const router = express.Router();

router.get('/what-job-title-or-role', roleController.getRole);

router.post(
	'/what-job-title-or-role',
	decodeUri('body', ['role']),
	roleValidationRules(),
	validationErrorHandler,
	roleController.postRole
);

module.exports = router;
