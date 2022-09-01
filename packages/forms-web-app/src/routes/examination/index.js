const express = require('express');
const { rules: validate } = require('../../validators/shared/full-name');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const router = express.Router();

const { getYourName, postYourName } = require('../../controllers/examination/your-name');
const { getHaveYourSay } = require('../../controllers/examination/have-your-say');

router.get('/your-name', getYourName);
router.post('/your-name', validate(), validationErrorHandler, postYourName);
router.get('/have-your-say-during-examination/:case_ref', getHaveYourSay);

module.exports = router;
