const {
	getRegisterOfApplicationsURL
} = require('../../register-of-applications/utils/get-register-of-applications-url');

const relatedContentLinkViewModel = (name, url) => ({
	name,
	url
});

const getRelatedContentLinks = [
	relatedContentLinkViewModel('Register of applications', getRegisterOfApplicationsURL())
];

module.exports = { getRelatedContentLinks };
