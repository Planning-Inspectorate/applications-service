const { applicationDataFixture } = require('./application-data');
const { getApplicationsFixture } = require('./applications/get-applications-fixture');
const { getApplicationApprovalDocumentFixture } = require('./project-documents');
const {
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
} = require('./project-updates');

module.exports = {
	applicationDataFixture,
	getApplicationsFixture,
	getApplicationApprovalDocumentFixture,
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
};
