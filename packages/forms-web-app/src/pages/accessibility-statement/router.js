const express = require('express');
const { getAccessibilityStatementController } = require('./controller');
const { getAccessibilityStatementURL } = require('./_utils/get-accessibility-statement-url');
const {
	addAccessibilityStatementTranslationsMiddleware
} = require('./_middleware/add-accessibility-statement-translations-middleware');
const { cacheNoCacheMiddleware } = require('../../middleware/cache-control');

const accessibilityStatementRouter = express.Router();
const accessibilityStatementURL = getAccessibilityStatementURL();

accessibilityStatementRouter.use(cacheNoCacheMiddleware);

accessibilityStatementRouter.get(
	accessibilityStatementURL,
	addAccessibilityStatementTranslationsMiddleware,
	getAccessibilityStatementController
);

module.exports = { accessibilityStatementRouter };
