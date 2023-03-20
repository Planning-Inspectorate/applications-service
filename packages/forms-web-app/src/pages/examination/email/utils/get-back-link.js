const {
	routesConfig: {
		examination: {
			pages: { applicant, nameMyself, nameAgent, nameOrganisation, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const { getExaminationSession } = require('../../_session/examination-session');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const getBackLink = (session, query) => {
	const examinationSession = getExaminationSession(session);

	let backLink;

	if (isQueryModeEdit(query)) backLink = `${checkYourAnswers.route}`;
	else if (examinationSession.isApplicant === 'yes') backLink = `${applicant.route}`;
	else if (examinationSession.submittingFor === 'organisation')
		backLink = `${nameOrganisation.route}`;
	else if (examinationSession.submittingFor === 'agent') backLink = `${nameAgent.route}`;
	else if (examinationSession.submittingFor === 'myself') backLink = `${nameMyself.route}`;

	return backLink;
};

module.exports = {
	getBackLink
};
