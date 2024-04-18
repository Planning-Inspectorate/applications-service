const { featureFlag } = require('../../../config');
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

const getPrimaryNavigationLinks = (pageURL) => {
	let primaryNavigationLinks = [];

	if (featureFlag.allowHomepage)
		primaryNavigationLinks.push(primaryNavigationLinkModel('Home', getIndexURL(), pageURL));

	primaryNavigationLinks.push(
		primaryNavigationLinkModel('All projects', getProjectSearchURL(), pageURL)
	);

	if (featureFlag.allowHomepage)
		primaryNavigationLinks.push(
			primaryNavigationLinkModel('Detailed information', getDetailedInformationURL(), pageURL)
		);

	return primaryNavigationLinks;
};

module.exports = { getPrimaryNavigationLinks };
