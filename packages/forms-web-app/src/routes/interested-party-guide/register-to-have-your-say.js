
const express = require('express');

const registerToHaveYourSayController = require('../../controllers/interested-party-guide/register-to-have-your-say');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
    rules: registerToHaveYourSayRules,
  } = require('../../validators/interested-party-guide/register-to-have-your-say');

const router = express.Router();

router.get('/register-to-have-your-say', registerToHaveYourSayController.getRegisterToHaveYourSay);

router.post(
    '/register-to-have-your-say',
    registerToHaveYourSayRules(),
    validationErrorHandler,
    registerToHaveYourSayController.postRegisterToHaveYourSay
  );

  module.exports = router;
