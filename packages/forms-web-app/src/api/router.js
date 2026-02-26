const express = require('express');

const { applicationsDownloadRouter } = require('./applications-download/router');

const apiRouter = express.Router();

apiRouter.use(applicationsDownloadRouter);

module.exports = { apiRouter };
