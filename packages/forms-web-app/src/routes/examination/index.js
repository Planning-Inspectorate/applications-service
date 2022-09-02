const express = require('express');
const { rules: validate } = require('../../validators/shared/full-name');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
	routesConfig: {
		examination: { pages }
	}
} = require('../../routes/config');

const { getHaveYourSay, postHaveYourSay } = require('../../controllers/examination/have-your-say');
const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../controllers/examination/submitting-for');
const { getYourName, postYourName } = require('../../controllers/examination/your-name');

const router = express.Router();

router.get(pages.haveYourSay.route, getHaveYourSay);
router.post(pages.haveYourSay.route, postHaveYourSay);
router.get(pages.submittingFor.route, getSubmittingFor);
router.post(pages.submittingFor.route, postSubmittingFor);
router.get(pages.yourName.route, getYourName);
router.post(pages.yourName.route, validate(), validationErrorHandler, postYourName);

module.exports = router;
