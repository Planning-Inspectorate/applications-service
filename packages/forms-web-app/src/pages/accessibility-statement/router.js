const express = require('express');
const { getAccessibilityStatementController } = require('./controller');
const { getAccessibilityStatementURL } = require('./utils/get-accessibility-statement-url');

const accessibilityStatementRouter = express.Router();
const accessibilityStatementURL = getAccessibilityStatementURL();

accessibilityStatementRouter.get(accessibilityStatementURL, getAccessibilityStatementController);

module.exports = { accessibilityStatementRouter };
