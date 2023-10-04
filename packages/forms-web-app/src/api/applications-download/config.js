const { apiSubdirectory } = require('../config');

const applicationsDownloadRoute = 'applications-download';

const applicationsDownloadURL = `/${apiSubdirectory}/${applicationsDownloadRoute}`;

module.exports = { applicationsDownloadRoute, applicationsDownloadURL };
