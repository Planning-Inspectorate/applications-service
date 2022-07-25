const express = require('express');

const commentsController = require('../../../controllers/register/organisation/tell-us-about-project');
const decodeUri = require('../../../middleware/decode-uri');
const { validate } = require('../../../validators/register/tell-us-about-project');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const router = express.Router();

router.get('/tell-us-about-project', commentsController.getComments);

router.post(
	'/tell-us-about-project',
	decodeUri('body', ['comment']),
	validate(),
	validationErrorHandler,
	commentsController.postComments
);

module.exports = router;
