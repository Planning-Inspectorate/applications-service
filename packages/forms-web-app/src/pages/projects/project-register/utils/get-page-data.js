const { mappedApplications } = require('../../_utils/mapped-applications');
const { getApplicationsRegisterSortByLinks } = require('./get-applications-register-sort-links');

const getPageData = (applications, query) => ({
	applications: mappedApplications(applications.applications),
	sortByLinks: getApplicationsRegisterSortByLinks(query)
});

module.exports = {
	getPageData
};
