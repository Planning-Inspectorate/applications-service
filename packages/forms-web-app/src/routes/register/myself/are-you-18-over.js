const express = require('express');

const over18Controller = require('../../../controllers/register/myself/are-you-18-over');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const { rules: over18Rules } = require('../../../validators/register/myself/are-you-18-over');

const router = express.Router();

router.get('/are-you-18-over', over18Controller.getOver18);

router.post('/are-you-18-over', over18Rules(), validationErrorHandler, over18Controller.postOver18);

module.exports = router;
