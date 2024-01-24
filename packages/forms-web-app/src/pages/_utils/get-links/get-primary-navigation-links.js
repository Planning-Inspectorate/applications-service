const { featureFlag } = require('../../../config');
const {
	getDetailedInformationURL
} = require('../../detailed-information/_utils/get-detailed-information-url');
const { getIndexURL } = require('../../index/utils/get-index-url');
const { getProjectSearchURL } = require('../../project-search/utils/get-project-search-url');

const isPrimaryNavigationLinkActive = (linkURL, pageURL) => pageURL.includes(linkURL);

const primaryNavigationLinkModel = (text, linkURL, pageURL) => ({
	text,
	href: linkURL,
	active: isPrimaryNavigationLinkActive(linkURL, pageURL)
});

const getPrimaryNavigationLinks = (i18n, pageURL) => {
	let primaryNavigationLinks = [];

	if (featureFlag.allowHomepage)
		primaryNavigationLinks.push(primaryNavigationLinkModel(i18n.t('common:primaryNav.home'), getIndexURL(), pageURL));

	if (!featureFlag.usePrivateBetaV1RoutesOnly)
		primaryNavigationLinks.push(
			primaryNavigationLinkModel( i18n.t('common:primaryNav.projectSearch'), getProjectSearchURL(), pageURL)
		);

	if (featureFlag.allowHomepage)
		primaryNavigationLinks.push(
			primaryNavigationLinkModel(i18n.t('common:primaryNav.detailedInformation'), getDetailedInformationURL(), pageURL)
		);

	return primaryNavigationLinks;
};

module.exports = { getPrimaryNavigationLinks };
