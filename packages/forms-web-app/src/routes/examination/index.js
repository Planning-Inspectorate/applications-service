const express = require('express');
const { rules: validate } = require('../../validators/full-name');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const router = express.Router();

const yourNameController = require('../../controllers/examination/your-name');
const haveYourSayController = require('../../controllers/examination/have-your-say');

router.get('/your-name', yourNameController.getYourName);
router.post('/your-name', validate(), validationErrorHandler, yourNameController.postYourName);
router.get('/have-your-say-during-examination', haveYourSayController.getHaveYourSay);
router.post('/have-your-say-during-examination', haveYourSayController.postHaveYourSay);

module.exports = router;
