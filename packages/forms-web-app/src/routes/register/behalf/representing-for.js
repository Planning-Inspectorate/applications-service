const express = require('express');

const representingForController = require('../../../controllers/register/behalf/representing-for');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const {
    rules: representingForRules,
  } = require('../../../validators/register/behalf/representing-for');

const router = express.Router();

router.get('/representing-for', representingForController.getRepresentingFor);

router.post(
    '/representing-for',
    representingForRules(),
    validationErrorHandler,
    representingForController.postRepresentingFor
  );

module.exports = router;