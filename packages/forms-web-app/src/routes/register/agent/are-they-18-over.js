const express = require('express');

const over18Controller = require('../../../controllers/register/agent/are-they-18-over');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const { over18Rule } = require('../../../validators/shared');

const router = express.Router();

router.get('/are-they-18-over', over18Controller.getOver18);

router.post(
	'/are-they-18-over',
	over18Rule(true),
	validationErrorHandler,
	over18Controller.postOver18
);

module.exports = router;
