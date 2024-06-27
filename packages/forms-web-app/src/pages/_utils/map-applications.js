const { projectStagesTranslations } = require('../../utils/project-stages');
const { getProjectsIndexURL } = require('../projects/index/_utils/get-projects-index-url');
const { formatDate } = require('../../utils/date-utils');

const mapApplications = ({ language }, applications) =>
	applications.map((application) => ({
		applicant: application.PromoterName,
		applicationDate: formatDate(application.DateOfDCOSubmission, language, 'DD MMM YYYY'),
		decisionDate: formatDate(application.ConfirmedDateOfDecision, language, 'DD MMM YYYY'),
		location: application.ProjectLocation,
		pageURL: getProjectsIndexURL(application.CaseReference),
		projectName: application.ProjectName,
		stage: projectStagesTranslations[application.Stage][language]
	}));

module.exports = { mapApplications };
