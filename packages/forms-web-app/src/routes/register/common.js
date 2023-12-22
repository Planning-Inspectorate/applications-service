const express = require('express');

const registrationCompleteController = require('../../controllers/register/common/registration-complete/controller');
const registrationSavedController = require('../../controllers/register/common/registration-saved/controller');
const declarationController = require('../../controllers/register/common/declaration/controller');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router({ mergeParams: true });

router.get('/declaration', declarationController.getDeclaration);
router.post('/declaration', asyncRoute(declarationController.postDeclaration));

router.get('/registration-complete', registrationCompleteController.getConfirmation);

router.get('/registration-saved', registrationSavedController.getRegistrationSaved);

module.exports = router;
