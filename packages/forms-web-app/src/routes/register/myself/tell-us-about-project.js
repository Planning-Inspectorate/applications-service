const express = require('express');

const tellUsAboutProjectController = require('../../../controllers/register/myself/tell-us-about-project');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	rules: tellUsAboutProjectValidationRules
} = require('../../../validators/register/myself/tell-us-about-project');

const router = express.Router();

router.get('/tell-us-about-project', tellUsAboutProjectController.getComments);

router.post(
	'/tell-us-about-project',
	tellUsAboutProjectValidationRules(),
	validationErrorHandler,
	tellUsAboutProjectController.postComments
);

module.exports = router;
