const express = require('express');

const over18Controller = require('../../../controllers/register/over-18');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const {
    rules: over18Rules,
  } = require('../../../validators/register/over-18');

const router = express.Router();

router.get('/over-18', over18Controller.getOver18);

router.post(
    '/over-18',
    over18Rules(),
    validationErrorHandler,
    over18Controller.postOver18
  );

module.exports = router;