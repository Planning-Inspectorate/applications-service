const express = require('express');

const {
	getRepresentationsIndexController,
	postRepresentationsIndexController
} = require('./index/controller');
const { getRepresentationController } = require('./representation/controller');

const { getRepresentationsIndexURL } = require('./index/_utils/get-representations-index-url');
const { getRepresentationURL } = require('./representation/_utils/get-representation-url');

const { projectsMiddleware } = require('../_middleware/middleware');
const {
	addCommonTranslationsMiddleware
} = require('./../../_middleware/i18n/add-common-translations-middleware');
const {
	addRepresentationsIndexTranslationsMiddleware
} = require('./index/_middleware/add-representations-index-translations-middleware');
const { cacheMustRevalidateMaxAgeMiddleware } = require('../../../middleware/cache-control');

const config = require('../../../config');

const representationsIndexURL = getRepresentationsIndexURL();
const representationURL = getRepresentationURL();

const representationsRouter = express.Router();

representationsRouter.use(
	cacheMustRevalidateMaxAgeMiddleware(config.cacheControl.representationsMaxAge)
);

representationsRouter.get(
	representationsIndexURL,
	projectsMiddleware,
	addCommonTranslationsMiddleware,
	addRepresentationsIndexTranslationsMiddleware,
	getRepresentationsIndexController
);

representationsRouter.post(representationsIndexURL, postRepresentationsIndexController);

representationsRouter.get(
	representationURL,
	projectsMiddleware,
	addRepresentationsIndexTranslationsMiddleware,
	getRepresentationController
);

module.exports = { representationsRouter };
