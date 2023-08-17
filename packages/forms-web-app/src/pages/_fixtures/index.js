const { applicationDataFixture } = require('./application-data');
const { getApplicationApprovalDocumentFixture } = require('./project-documents');
const {
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
} = require('./project-updates');

module.exports = {
	applicationDataFixture,
	getApplicationApprovalDocumentFixture,
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
};
