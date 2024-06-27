const dayjs = require('dayjs');
const { projectStagesTranslations } = require('../../utils/project-stages');
const { getProjectsIndexURL } = require('../projects/index/_utils/get-projects-index-url');

const formatDate = (date, format = 'DD MMM YYYY') => (date ? dayjs(date).format(format) : '');

const mapApplications = ({ language }, applications) =>
	applications.map((application) => ({
		applicant: application.PromoterName,
		applicationDate: formatDate(application.DateOfDCOSubmission),
		decisionDate: formatDate(application.ConfirmedDateOfDecision),
		location: application.ProjectLocation,
		pageURL: getProjectsIndexURL(application.CaseReference),
		projectName: application.ProjectName,
		stage: projectStagesTranslations[application.Stage][language]
	}));

module.exports = { mapApplications };
