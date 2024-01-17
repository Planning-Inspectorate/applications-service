const { featureFlag } = require('../../../config');
const { getLocaleTranslation } = require('../../_locales/_utils/get-locale-content');
const { getPrimaryNavigationLinksText } = require('../../_locales/primary-navigation-links');
const {
	getDetailedInformationURL
} = require('../../detailed-information/_utils/get-detailed-information-url');
const { getIndexURL } = require('../../index/utils/get-index-url');
const { getProjectSearchURL } = require('../../project-search/utils/get-project-search-url');

const isPrimaryNavigationLinkActive = (linkURL, pageURL) =>
	linkURL === pageURL || `${linkURL}/` === pageURL;

const primaryNavigationLinkModel = (text, linkURL, pageURL) => ({
	text,
	href: linkURL,
	active: isPrimaryNavigationLinkActive(linkURL, pageURL)
});

const getPrimaryNavigationLinks = (locale, pageURL) => {
	let primaryNavigationLinks = [];

	const primaryNavigationLinksText = getPrimaryNavigationLinksText();
	const primaryNavigationLinksLocale = getLocaleTranslation(locale, primaryNavigationLinksText);

	if (featureFlag.allowHomepage)
		primaryNavigationLinks.push(
			primaryNavigationLinkModel(primaryNavigationLinksLocale.indexPageText, getIndexURL(), pageURL)
		);

	if (!featureFlag.usePrivateBetaV1RoutesOnly)
		primaryNavigationLinks.push(
			primaryNavigationLinkModel(
				primaryNavigationLinksLocale.projectSearchText,
				getProjectSearchURL(),
				pageURL
			)
		);

	if (featureFlag.allowHomepage)
		primaryNavigationLinks.push(
			primaryNavigationLinkModel(
				primaryNavigationLinksLocale.detailedInformationText,
				getDetailedInformationURL(),
				pageURL
			)
		);

	return primaryNavigationLinks;
};

module.exports = { getPrimaryNavigationLinks };
