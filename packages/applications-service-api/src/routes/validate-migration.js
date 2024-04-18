const express = require('express');

const validateMigrationController = require('../controllers/validate-migration');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.get('/:caseReference', asyncRoute(validateMigrationController.validateMigration));

module.exports = router;
