const express = require('express');

const representingForController = require('../../controllers/register/representing-for');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
    rules: representingForRules,
  } = require('../../validators/register/representing-for');

const router = express.Router();

router.get('/representing-for', representingForController.getRepresentingFor);

router.post(
    '/representing-for',
    representingForRules(),
    validationErrorHandler,
    representingForController.postRepresentingFor
  );

module.exports = router;