const {
	getRegisterOfApplicationsURL
} = require('../../register-of-applications/utils/get-register-of-applications-url');

const relatedContentLinkViewModel = (name, url) => ({
	name,
	url
});

const getRelatedContentLinks = (i18n, namespace = 'projectSearch') => [
	relatedContentLinkViewModel(
		i18n.t(`${namespace}.sidebar.registerOfApplications`),
		getRegisterOfApplicationsURL()
	)
];

module.exports = { getRelatedContentLinks };
