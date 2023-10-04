const express = require('express');

const { getApplicationsDownload } = require('./controller');

const { applicationsDownloadRoute } = require('./config');

const applicationsDownloadRouter = express.Router();

applicationsDownloadRouter.get(`/${applicationsDownloadRoute}`, getApplicationsDownload);

module.exports = { applicationsDownloadRouter };
