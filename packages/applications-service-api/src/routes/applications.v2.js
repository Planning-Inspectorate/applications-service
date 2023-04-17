const express = require('express');

const applicationsController = require('../controllers/applications.v2');

const router = express.Router();

router.get('/:caseReference', applicationsController.getApplication);

module.exports = router;
