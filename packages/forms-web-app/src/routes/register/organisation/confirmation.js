const express = require('express');

const confirmationController = require('../../../controllers/register/organisation/confirmation');

const router = express.Router();

router.get('/confirmation', confirmationController.getConfirmation);

module.exports = router;
