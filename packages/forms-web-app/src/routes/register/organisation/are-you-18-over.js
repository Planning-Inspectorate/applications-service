const express = require('express');

const over18Controller = require('../../../controllers/register/organisation/are-you-18-over');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const { over18Rule } = require('../../../validators/shared');

const router = express.Router();

router.get('/are-you-18-over', over18Controller.getOver18);

router.post('/are-you-18-over', over18Rule(), validationErrorHandler, over18Controller.postOver18);

module.exports = router;
