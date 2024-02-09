const { isProjectStatusPostDecision } = require('./utils/is-project-status-post-decision');
const { hasDecisionDatePassed } = require('./utils/has-decision-date-passed');
const { setOrRemoveGetUpdatesSession } = require('./utils/set-or-remove-get-updates-session');
const { getUpdatesEmailURL } = require('../email/utils/get-updates-email-url');

const view = 'projects/get-updates/index/view.njk';

const getGetUpdatesIndexController = (req, res) => {
	const {
		session,
		params: { case_ref: caseRef }
	} = req;

	const { locals } = res;
	const { applicationData } = locals;
	const { status, confirmedDateOfDecision } = applicationData;
	const { number: projectStatusNumber } = status;

	const postDecisionStatus = isProjectStatusPostDecision(projectStatusNumber);
	const decisionDatePassed = hasDecisionDatePassed(confirmedDateOfDecision);

	setOrRemoveGetUpdatesSession(postDecisionStatus, decisionDatePassed, session, caseRef);

	return res.render(view, {
		nextPageRoute: getUpdatesEmailURL(caseRef),
		pageHeading: 'Get updates about this project',
		pageTitle: `Get updates | ${res.locals.projectName}`,
		decisionDatePassed
	});
};

module.exports = {
	getGetUpdatesIndexController
};
