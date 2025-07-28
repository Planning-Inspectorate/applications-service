const {
	getRegisterOfApplicationsURL
} = require('../../register-of-applications/utils/get-register-of-applications-url');

const relatedContentLinkViewModel = (name, url) => ({
	name,
	url
});

const getRelatedContentLinks = (i18n) => [
	relatedContentLinkViewModel(
		i18n.t('projectSearch.sidebar.registerOfApplications'),
		getRegisterOfApplicationsURL()
	)
];

module.exports = { getRelatedContentLinks };
