const express = require('express');

const { getIndexController } = require('./index/controller');
const { getTermsAndConditionsController } = require('./terms-and-conditions/controller');
const { getContactController } = require('./contact/controller');
const { getCookiesController, postCookiesController } = require('./cookies/controller');
const { getDetailedInformationController } = require('./detailed-information/controller');
const { getRegisterOfApplicationsController } = require('./register-of-applications/controller');
const { getProjectSearchController } = require('./project-search/controller');

const { getIndexURL } = require('./index/utils/get-index-url');
const {
	getTermsAndConditionsURL
} = require('./terms-and-conditions/_utils/get-terms-and-conditions-url');
const { getContactURL } = require('./contact/_utils/get-contact-url');
const { getCookiesURL } = require('./cookies/_utils/get-cookies-url');
const { getProjectSearchURL } = require('./project-search/utils/get-project-search-url');
const {
	getDetailedInformationURL
} = require('./detailed-information/_utils/get-detailed-information-url');
const {
	getRegisterOfApplicationsURL
} = require('./register-of-applications/utils/get-register-of-applications-url');

const {
	addCommonTranslationsMiddleware
} = require('./_middleware/i18n/add-common-translations-middleware');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');
const {
	addDetailedInformationTranslationsMiddleware
} = require('./detailed-information/_middleware/add-detailed-information-translations-middleware');
const {
	addTermsAndConditionsTranslationsMiddleware
} = require('./terms-and-conditions/_middleware/add-terms-and-conditions-translations-middleware');

const { cookiesValidationRules } = require('./cookies/_validators/validate-cookies');
const { validationErrorHandler } = require('../validators/validation-error-handler');

const { projectsRouter } = require('./projects/router');
const { registerOfAdviceRouter } = require('./register-of-advice/router');

const indexURL = getIndexURL();
const termsAndConditionsURL = getTermsAndConditionsURL();
const contactURL = getContactURL();
const cookiesURL = getCookiesURL();
const projectSearchURL = getProjectSearchURL();
const detailedInformationURL = getDetailedInformationURL();
const registerOfApplicationsURL = getRegisterOfApplicationsURL();

const { featureFlag } = require('../config');

const pagesRouter = express.Router();

if (featureFlag.allowHomepage) {
	pagesRouter.get(
		indexURL,
		addCommonTranslationsMiddleware,
		addIndexTranslationsMiddleware,
		getIndexController
	);
	pagesRouter.get(
		detailedInformationURL,
		addDetailedInformationTranslationsMiddleware,
		getDetailedInformationController
	);
	pagesRouter.use(registerOfAdviceRouter);
}

pagesRouter.get(projectSearchURL, getProjectSearchController);

pagesRouter.get(registerOfApplicationsURL, getRegisterOfApplicationsController);

pagesRouter.get(
	termsAndConditionsURL,
	addTermsAndConditionsTranslationsMiddleware,
	getTermsAndConditionsController
);

pagesRouter.get(cookiesURL, getCookiesController);
pagesRouter.post(
	cookiesURL,
	cookiesValidationRules(),
	validationErrorHandler,
	postCookiesController
);

pagesRouter.get(contactURL, getContactController);

pagesRouter.use(projectsRouter);

module.exports = { pagesRouter };
