const express = require('express');

const router = express.Router();

const yourNameController = require('../../controllers/examination/your-name');
const haveYourSayController = require('../../controllers/examination/have-your-say');

router.get('/your-name', yourNameController.getYourName);
router.post('/your-name', yourNameController.postYourName);
router.get('/have-your-say-during-examination', haveYourSayController.getHaveYourSay);
router.post('/have-your-say-during-examination', haveYourSayController.postHaveYourSay);

module.exports = router;
