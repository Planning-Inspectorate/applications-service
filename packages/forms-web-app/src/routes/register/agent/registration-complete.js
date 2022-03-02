const express = require('express');

const confirmationController = require('../../../controllers/register/agent/registration-complete');

const router = express.Router();

router.get('/registration-complete', confirmationController.getConfirmation);

module.exports = router;
