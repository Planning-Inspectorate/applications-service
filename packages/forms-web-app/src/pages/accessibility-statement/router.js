const express = require('express');
const { getAccessibilityStatementController } = require('./controller');
const { getAccessibilityStatementURL } = require('./utils/get-accessibility-statement-url');

const accessibilityStatementRouter = express.Router();

accessibilityStatementRouter.get(getAccessibilityStatementURL, getAccessibilityStatementController);

module.exports = { accessibilityStatementRouter };
