const express = require('express');

const registrationCompleteController = require('../../../controllers/register/myself/registration-complete');

const router = express.Router();

router.get('/registration-complete', registrationCompleteController.getConfirmation);

module.exports = router;
