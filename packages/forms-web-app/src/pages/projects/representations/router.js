const express = require('express');

const { getRepresentationsIndexController } = require('./index/controller');
const { getRepresentationController } = require('./representation/controller');

const { getRepresentationsIndexURL } = require('./index/_utils/get-representations-index-url');
const { getRepresentationURL } = require('./representation/_utils/get-representation-url');

const { projectsMiddleware } = require('../_middleware/middleware');

const representationsIndexURL = getRepresentationsIndexURL();
const representationURL = getRepresentationURL();

const representationsRouter = express.Router();

representationsRouter.get(
	representationsIndexURL,
	projectsMiddleware,
	getRepresentationsIndexController
);

representationsRouter.get(representationURL, projectsMiddleware, getRepresentationController);

module.exports = { representationsRouter };
