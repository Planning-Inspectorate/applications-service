const express = require('express');

const { getIndexController } = require('./index/controller');
const { getContactController } = require('./contact/controller');
const { getDetailedInformationController } = require('./detailed-information/controller');
const { getRegisterOfApplicationsController } = require('./register-of-applications/controller');
const { getProjectSearchController } = require('./project-search/controller');

const { getIndexURL } = require('./index/utils/get-index-url');
const { getContactURL } = require('./contact/_utils/get-contact-url');
const { getProjectSearchURL } = require('./project-search/utils/get-project-search-url');
const {
	getDetailedInformationURL
} = require('./detailed-information/_utils/get-detailed-information-url');
const {
	getRegisterOfApplicationsURL
} = require('./register-of-applications/utils/get-register-of-applications-url');

const { projectsRouter } = require('./projects/router');

const indexURL = getIndexURL();
const contactURL = getContactURL();
const projectSearchURL = getProjectSearchURL();
const detailedInformationURL = getDetailedInformationURL();
const registerOfApplicationsURL = getRegisterOfApplicationsURL();

const { featureFlag } = require('../config');

const pagesRouter = express.Router();

if (featureFlag.allowHomepage) {
	pagesRouter.get(indexURL, getIndexController);
	pagesRouter.get(detailedInformationURL, getDetailedInformationController);
}

if (!featureFlag.usePrivateBetaV1RoutesOnly) {
	pagesRouter.get(projectSearchURL, getProjectSearchController);
	pagesRouter.get(registerOfApplicationsURL, getRegisterOfApplicationsController);
}

pagesRouter.get(contactURL, getContactController);

pagesRouter.use(projectsRouter);

module.exports = { pagesRouter };
