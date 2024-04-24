const { featureFlag } = require('../../../config');
const {
	getDetailedInformationURL
} = require('../../detailed-information/_utils/get-detailed-information-url');
const { getIndexURL } = require('../../index/utils/get-index-url');
const { getProjectSearchURL } = require('../../project-search/utils/get-project-search-url');

const primaryNavigationLinkModel = (text, link, path) => ({
	text,
	href: link,
	active: link === path
});

const getPrimaryNavigationLinks = (path, i18n) => {
	let primaryNavigationLinks = [];

	if (featureFlag.allowHomepage) {
		primaryNavigationLinks.push(
			primaryNavigationLinkModel(i18n.t('global.primaryNavigation.home'), getIndexURL(), path)
		);
	}

	primaryNavigationLinks.push(
		primaryNavigationLinkModel(
			i18n.t('global.primaryNavigation.projectSearch'),
			getProjectSearchURL(),
			path
		)
	);

	if (featureFlag.allowHomepage) {
		primaryNavigationLinks.push(
			primaryNavigationLinkModel(
				i18n.t('global.primaryNavigation.detailedInformation'),
				getDetailedInformationURL(),
				path
			)
		);
	}

	return primaryNavigationLinks;
};

module.exports = { getPrimaryNavigationLinks };
