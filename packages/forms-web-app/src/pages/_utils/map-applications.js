const dayjs = require('dayjs');
const { projectStages } = require('../../utils/project-stages');

const formatDate = (date, format = 'DD MMM YYYY') => (date ? dayjs(date).format(format) : '');

const mapApplications = (applications) =>
	applications.map((application) => ({
		applicant: application.PromoterName,
		applicationDate: formatDate(application.DateOfDCOSubmission),
		decisionDate: formatDate(application.ConfirmedDateOfDecision),
		location: application.ProjectLocation,
		pageURL: `/projects/${application.CaseReference}`,
		projectName: application.ProjectName,
		stage: projectStages[application.Stage]
	}));

module.exports = { mapApplications };
