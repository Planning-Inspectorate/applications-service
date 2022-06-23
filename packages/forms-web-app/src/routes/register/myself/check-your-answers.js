const express = require('express');
const checkYourAnswersController = require('../../../controllers/register/myself/check-your-answers');
const unescapeStrings = require('../../../middleware/unescape-strings');

const router = express.Router();

router.get(
  '/check-answers',
  unescapeStrings('session', ['comment']),
  checkYourAnswersController.getCheckYourAnswers
);

module.exports = router;
