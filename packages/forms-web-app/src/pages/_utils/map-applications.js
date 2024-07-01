const dayjs = require('dayjs');
const { projectStagesTranslations } = require('../../utils/project-stages');
const { getProjectsIndexURL } = require('../projects/index/_utils/get-projects-index-url');
const { isLangWelsh } = require('./is-lang-welsh');

const formatDate = (date, format = 'DD MMM YYYY') => (date ? dayjs(date).format(format) : '');

const mapApplications = ({ language }, applications) =>
	applications.map((application) => {
		const langIsWelsh = isLangWelsh(language);
		return {
			applicant: application.PromoterName,
			applicationDate: formatDate(application.DateOfDCOSubmission),
			decisionDate: formatDate(application.ConfirmedDateOfDecision),
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
