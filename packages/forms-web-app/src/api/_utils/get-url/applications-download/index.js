const { apiSubdirectory } = require('../../../config');
const { applicationsDownloadRoute } = require('../../../applications-download/config');

const getApplicationsDownloadURL = `/${apiSubdirectory}/${applicationsDownloadRoute}`;

module.exports = { getApplicationsDownloadURL };
