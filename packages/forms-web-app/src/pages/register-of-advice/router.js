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

const registerOfAdviceIndexURL = getRegisterOfAdviceIndexURL();
const registerOfAdviceDetailURL = getRegisterOfAdviceDetailURL();

const registerOfAdviceRouter = express.Router();

registerOfAdviceRouter.use(addSection51TranslationsMiddleware);

registerOfAdviceRouter.get(registerOfAdviceIndexURL, getRegisterOfAdviceController);

registerOfAdviceRouter.get(registerOfAdviceDetailURL, getSection51AdviceDetailController);

module.exports = { registerOfAdviceRouter };
