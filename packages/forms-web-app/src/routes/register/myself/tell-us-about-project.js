const express = require('express');
const sanitiseStrings = require('../../../middleware/sanitise-strings');
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
  sanitiseStrings('body', ['comment']),
  tellUsAboutProjectController.postComments
);

module.exports = router;
