const express = require('express');

const checkYourAnswersController = require('../../../controllers/register/organisation/check-answers');
const decodeUri = require('../../../middleware/decode-uri');

const router = express.Router();

router.get(
	'/check-answers',
	decodeUri('session', ['comment']),
	checkYourAnswersController.getCheckYourAnswers
);

module.exports = router;
