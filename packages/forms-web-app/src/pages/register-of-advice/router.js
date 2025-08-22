const express = require('express');

const { getRegisterOfAdviceController } = require('./index/controller');
const {
	getSection51AdviceDetailController
} = require('../projects/section-51/advice-detail/controller');

const { getRegisterOfAdviceIndexURL } = require('./index/_utils/get-register-of-advice-index-url');
const {
	getRegisterOfAdviceDetailURL
} = require('./detail/_utils/get-register-of-advice-detail-url');
const {
	addSection51TranslationsMiddleware
} = require('../projects/section-51/_middleware/add-section-51-translations-middleware');

const {
	storeRegisterOfAdviceReferrerMiddleware
} = require('./index/_middleware/store-register-of-advice-referrer-middleware');

const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');

const {
	registerOfAdviceTranslationsMiddleware
} = require('./index/_middleware/register-of-advice-middleware');

const {
	clearRegisterOfAdviceReferrerMiddleware
} = require('./index/_middleware/clear-register-of-advice-referrer-middleware');

const registerOfAdviceIndexURL = getRegisterOfAdviceIndexURL();
const registerOfAdviceDetailURL = getRegisterOfAdviceDetailURL();

const registerOfAdviceRouter = express.Router();

registerOfAdviceRouter.get(
	registerOfAdviceIndexURL,
	addCommonTranslationsMiddleware,
	addSection51TranslationsMiddleware,
	registerOfAdviceTranslationsMiddleware,
	clearRegisterOfAdviceReferrerMiddleware,
	getRegisterOfAdviceController
);

registerOfAdviceRouter.get(
	registerOfAdviceDetailURL,
	storeRegisterOfAdviceReferrerMiddleware,
	getSection51AdviceDetailController
);

module.exports = { registerOfAdviceRouter };
