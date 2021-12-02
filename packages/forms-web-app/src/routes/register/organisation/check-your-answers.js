const express = require('express');

const checkYourAnswersController = require('../../../controllers/register/organisation/check-your-answers');

const router = express.Router();

router.get('/check-your-answers', checkYourAnswersController.getCheckYourAnswers);

module.exports = router;