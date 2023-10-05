const express = require('express');

const { getProcessGuideController } = require('./controller');

const { processGuideURL } = require('./config');

const processGuideRouter = express.Router();

processGuideRouter.get(processGuideURL, getProcessGuideController);

module.exports = { processGuideRouter };
