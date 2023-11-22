const express = require('express');

const config = require('../../config');

const { getUpdatesRouter } = require('./get-updates/router');

const projectsRouter = express.Router();

const {
	featureFlag: { allowGetUpdates }
} = config;

if (allowGetUpdates) projectsRouter.use(getUpdatesRouter);

module.exports = projectsRouter;
