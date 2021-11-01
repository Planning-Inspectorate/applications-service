const express = require('express');

const applicationsController = require('../controllers/applications');

const router = express.Router();

router.get('/:id', applicationsController.getApplication);
router.get('/', applicationsController.getAllApplications);

module.exports = router;
