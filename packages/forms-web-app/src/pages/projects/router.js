const express = require('express');

const { getProjectsIndexController } = require('./index/controller');

const { getProjectsIndexURL } = require('./index/_utils/get-projects-index-url');

const { projectsMiddleware, projectMigrationMiddleware } = require('./_middleware/middleware');

const { featureFlag } = require('../../config');

const projectsIndexURL = getProjectsIndexURL();

const projectsRouter = express.Router();

if (featureFlag.allowProjectInformation) {
	projectsRouter.get(
		projectsIndexURL,
		[projectsMiddleware, projectMigrationMiddleware],
		getProjectsIndexController
	);
}

module.exports = { projectsRouter };
