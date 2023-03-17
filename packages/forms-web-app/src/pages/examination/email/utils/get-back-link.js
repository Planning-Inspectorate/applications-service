const {
	routesConfig: {
		examination: {
			directory,
			pages: { applicant, nameMyself, nameAgent, nameOrganisation, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const { getExaminationSession } = require('../../_session/examination-session');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const getBackLink = (session, query) => {
	const examinationSession = getExaminationSession(session);

	let backLink;

	if (isQueryModeEdit(query)) backLink = `${directory + checkYourAnswers.route}`;
	else if (examinationSession.isApplicant === 'yes') backLink = `${directory}${applicant.route}`;
	else if (examinationSession.submittingFor === 'organisation')
		backLink = `${directory}${nameOrganisation.route}`;
	else if (examinationSession.submittingFor === 'agent')
		backLink = `${directory}${nameAgent.route}`;
	else if (examinationSession.submittingFor === 'myself')
		backLink = `${directory}${nameMyself.route}`;

	return backLink;
};

module.exports = {
	getBackLink
};
