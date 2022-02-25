const express = require('express');

const registrationSavedController = require('../../../controllers/register/organisation/registration-saved');

const router = express.Router();

router.get('/registration-saved', registrationSavedController.getRegistrationSaved);

module.exports = router;
