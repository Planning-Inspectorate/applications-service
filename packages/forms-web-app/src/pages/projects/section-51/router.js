const express = require('express');

const { getSection51IndexController } = require('./index/controller');
const { getSection51AdviceDetailController } = require('./advice-detail/controller');

const { getSection51IndexURL } = require('./index/_utils/get-section-51-index-url');
const {
	getSection51AdviceDetailURL
} = require('./advice-detail/_utils/get-section-51-advice-detail-url');

const { projectsMiddleware } = require('../_middleware/middleware');

const section51IndexURL = getSection51IndexURL();
const section51AdviceDetailURL = getSection51AdviceDetailURL();

const section51Router = express.Router();

section51Router.get(section51IndexURL, projectsMiddleware, getSection51IndexController);

section51Router.get(
	section51AdviceDetailURL,
	projectsMiddleware,
	getSection51AdviceDetailController
);

module.exports = { section51Router };
