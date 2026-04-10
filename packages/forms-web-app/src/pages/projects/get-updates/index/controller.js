const { hasDecisionDatePassed } = require('./utils/has-decision-date-passed');
const { getUpdatesFormURL } = require('../form/utils/get-updates-form-url');
const { setOrRemoveGetUpdatesSession } = require('../_session');
const { isProjectStatusPostDecision } = require('./utils/is-project-status-post-decision');

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
		nextPageRoute: getUpdatesFormURL(caseRef),
		decisionDatePassed
	});
};

module.exports = {
	getGetUpdatesIndexController
};
