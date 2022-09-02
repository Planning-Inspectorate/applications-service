const express = require('express');
const { rules: validate } = require('../../validators/shared/full-name');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
	routesConfig: {
		examination: {
			pages: { haveYourSay, submittingFor, tbc, yourName }
		}
	}
} = require('../../routes/config');

const { getHaveYourSay } = require('../../controllers/examination/have-your-say');
const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../controllers/examination/submitting-for');
const { getTbc } = require('../../controllers/examination/tbc');
const { getYourName, postYourName } = require('../../controllers/examination/your-name');

const router = express.Router();

router.get(haveYourSay.route, getHaveYourSay);
router.get(submittingFor.route, getSubmittingFor);
router.get(tbc.route, getTbc);
router.post(submittingFor.route, postSubmittingFor);
router.get(yourName.route, getYourName);
router.post(yourName.route, validate(), validationErrorHandler, postYourName);

module.exports = router;
