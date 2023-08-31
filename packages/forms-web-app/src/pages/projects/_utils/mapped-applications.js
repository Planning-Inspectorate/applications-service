const { projectStages } = require('../../../utils/project-stages');

const mappedApplications = (applications) =>
	applications.map((application) => ({
		applicant: application.PromoterName,
		projectName: application.ProjectName,
		pageURL: `/projects/${application.CaseReference}`,
		stage: projectStages[application.Stage]
	}));

module.exports = { mappedApplications };
