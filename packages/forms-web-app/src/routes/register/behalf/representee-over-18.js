const express = require('express');

const over18Controller = require('../../../controllers/register/behalf/representee-over-18');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const {
    rules: over18Rules,
  } = require('../../../validators/register/behalf/representee-over-18');

const router = express.Router();

router.get('/representee-over-18', over18Controller.getOver18);

router.post(
    '/representee-over-18',
    over18Rules(),
    validationErrorHandler,
    over18Controller.postOver18
  );

module.exports = router;