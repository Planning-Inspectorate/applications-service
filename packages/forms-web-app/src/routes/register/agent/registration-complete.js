const express = require('express');

const confirmationController = require('../../../controllers/register/agent/registration-complete');
const { asyncRoute } = require("../../../utils/async-route");

const router = express.Router();

router.get('/registration-complete', asyncRoute(confirmationController.getConfirmation));

module.exports = router;
