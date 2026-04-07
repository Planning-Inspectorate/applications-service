const { hasDecisionDatePassed } = require('./utils/has-decision-date-passed');
const { getUpdatesFormURL } = require('../form/utils/get-updates-form-url');

const view = 'projects/get-updates/index/view.njk';

const getGetUpdatesIndexController = (req, res) => {
	const {
		params: { case_ref: caseRef }
	} = req;

	const confirmedDateOfDecision = res.locals?.applicationData?.confirmedDateOfDecision;
	const decisionDatePassed = hasDecisionDatePassed(confirmedDateOfDecision);

	return res.render(view, {
		nextPageRoute: getUpdatesFormURL(caseRef),
		decisionDatePassed
	});
};

module.exports = {
	getGetUpdatesIndexController
};
