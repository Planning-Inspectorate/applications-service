const { applicationDataFixture } = require('./application-data');
const { applicationsDataFixture } = require('./applications-data');
const { getApplicationApprovalDocumentFixture } = require('./project-documents');
const {
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
} = require('./project-updates');

module.exports = {
	applicationDataFixture,
	applicationsDataFixture,
	getApplicationApprovalDocumentFixture,
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
};
