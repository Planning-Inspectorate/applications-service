const express = require('express');

const couldNotVerifyEmailController = require('../../controllers/register/could-not-verify-email');

const router = express.Router();

router.get('/', couldNotVerifyEmailController.getCouldNotVerifyEmail);

module.exports = router;
