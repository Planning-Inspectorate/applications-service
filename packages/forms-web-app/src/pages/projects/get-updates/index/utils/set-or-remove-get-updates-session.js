const { removeGetUpdatesSession } = require('../../_session/remove-get-updates');
const { setGetUpdatesSession } = require('../../_session/get-updates');

const setOrRemoveGetUpdatesSession = (postDecisionStatus, decisionDatePassed, session, caseRef) => {
	if (postDecisionStatus || decisionDatePassed) {
		return removeGetUpdatesSession(session);
	}

	setGetUpdatesSession(session, caseRef);
};

module.exports = { setOrRemoveGetUpdatesSession };
