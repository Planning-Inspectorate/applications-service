const express = require('express');

const { applicationsDownloadRouter } = require('./applications-download/router');
const { cacheNoStoreMiddleware } = require('../middleware/cache-control');

const apiRouter = express.Router();

apiRouter.use(cacheNoStoreMiddleware);

apiRouter.use(applicationsDownloadRouter);

module.exports = { apiRouter };
