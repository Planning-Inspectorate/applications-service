const express = require('express');

const confirmationController = require('../../../controllers/register/myself/confirmation');

const router = express.Router();

router.get('/confirmation', confirmationController.getConfirmation);

module.exports = router;