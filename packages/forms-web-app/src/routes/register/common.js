const express = require('express');

const registrationCompleteController = require('../../controllers/register/common/registration-complete/controller');
const registrationSavedController = require('../../controllers/register/common/registration-saved/controller');

const router = express.Router({ mergeParams: true });

router.get('/registration-complete', registrationCompleteController.getConfirmation);

router.get('/registration-saved', registrationSavedController.getRegistrationSaved);

module.exports = router;
