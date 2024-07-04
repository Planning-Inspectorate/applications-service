const { projectStagesTranslations } = require('../../utils/project-stages');
const { getProjectsIndexURL } = require('../projects/index/_utils/get-projects-index-url');
const { formatDate } = require('../../utils/date-utils');
const { isLangWelsh } = require('./is-lang-welsh');

const mapApplications = ({ language }, applications) =>
	applications.map((application) => {
		const langIsWelsh = isLangWelsh(language);
		return {
			applicant: application.PromoterName,
			applicationDate: formatDate(application.DateOfDCOSubmission, language, 'DD MMM YYYY'),
			decisionDate: formatDate(application.ConfirmedDateOfDecision, language, 'DD MMM YYYY'),
			location:
				langIsWelsh && application.ProjectLocationWelsh
					? application.ProjectLocationWelsh
					: application.ProjectLocation,
			pageURL: getProjectsIndexURL(application.CaseReference),
			projectName:
				langIsWelsh && application.ProjectNameWelsh
					? application.ProjectNameWelsh
					: application.ProjectName,
			stage: projectStagesTranslations[application.Stage][language]
		};
	});

module.exports = { mapApplications };
