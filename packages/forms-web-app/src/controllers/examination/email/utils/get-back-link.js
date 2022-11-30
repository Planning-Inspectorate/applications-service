const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { applicant, nameMyself, nameAgent, nameOrganisation }
		}
	}
} = require('../../../../routes/config');

const { getExaminationSession } = require('../../session/examination-session');
const getBackLink = (session) => {
	const examinationSession = getExaminationSession(session);

	let backLink;

	if (examinationSession.isApplicant === 'yes')
		backLink = `${examinationDirectory}${applicant.route}`;
	else if (examinationSession.submittingFor === 'organisation')
		backLink = `${examinationDirectory}${nameOrganisation.route}`;
	else if (examinationSession.submittingFor === 'agent')
		backLink = `${examinationDirectory}${nameAgent.route}`;
	else if (examinationSession.submittingFor === 'myself')
		backLink = `${examinationDirectory}${nameMyself.route}`;

	return backLink;
};

module.exports = {
	getBackLink
};
