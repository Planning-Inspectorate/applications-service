const { applicationsDownloadURL } = require('../../../api/applications-download/config');
const { mapApplications } = require('../../_utils/map-applications');
const {
	getRegisterOfApplicationsSortByLinks
} = require('./get-register-of-applications-sort-by-links');

const getPageData = (i18n, applications, query) => ({
	applications: mapApplications(i18n, applications),
	applicationsDownloadURL,
	sortByLinks: getRegisterOfApplicationsSortByLinks(i18n, query),
	query
});

module.exports = {
	getPageData
};
