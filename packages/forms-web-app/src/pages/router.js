const express = require('express');

const { getIndexController } = require('./index/controller');
const { getContactController } = require('./contact/controller');
const { getDetailedInformationController } = require('./detailed-information/controller');

const { getIndexURL } = require('./index/utils/get-index-url');
const { getContactURL } = require('./contact/_utils/get-contact-url');
const {
	getDetailedInformationURL
} = require('./detailed-information/_utils/get-detailed-information-url');

const { projectsRouter } = require('./projects/router');

const indexURL = getIndexURL();
const contactURL = getContactURL();
const detailedInformationURL = getDetailedInformationURL();

const { featureFlag } = require('../config');

const pagesRouter = express.Router();

if (featureFlag.allowHomepage) pagesRouter.get(indexURL, getIndexController);

pagesRouter.get(contactURL, getContactController);

pagesRouter.get(detailedInformationURL, getDetailedInformationController);

pagesRouter.use(projectsRouter);

module.exports = { pagesRouter };
