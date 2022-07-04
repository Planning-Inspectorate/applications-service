const express = require('express');

const commentsController = require('../../../controllers/register/agent/tell-us-about-project');
const { validate } = require('../../../validators/register/tell-us-about-project');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const router = express.Router();

router.get('/tell-us-about-project', commentsController.getComments);

router.post(
	'/tell-us-about-project',
	validate(),
	validationErrorHandler,
	commentsController.postComments
);

module.exports = router;
