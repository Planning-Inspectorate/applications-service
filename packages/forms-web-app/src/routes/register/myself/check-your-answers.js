const express = require('express');

const checkYourAnswersController = require('../../../controllers/register/myself/check-your-answers');

const router = express.Router();

router.get('/check-answers', checkYourAnswersController.getCheckYourAnswers);

module.exports = router;
