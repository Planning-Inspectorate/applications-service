const express = require('express');

const confirmationController = require('../../../controllers/register/organisation/registration-complete');

const router = express.Router();

router.get('/registration-complete', confirmationController.getConfirmation);

module.exports = router;
