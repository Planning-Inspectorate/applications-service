const express = require('express');

const registrationCompleteController = require('../../controllers/register/common/registration-complete/controller');

const router = express.Router({ mergeParams: true });

router.get('/registration-complete', registrationCompleteController.getConfirmation);

module.exports = router;
