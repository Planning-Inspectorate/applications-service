const { removeGetUpdatesSession } = require('./remove-get-updates');
const { setGetUpdatesSession } = require('./get-updates');

const setOrRemoveGetUpdatesSession = (postDecisionStatus, decisionDatePassed, session, caseRef) => {
	if (postDecisionStatus || decisionDatePassed) {
		return removeGetUpdatesSession(session);
	}

	setGetUpdatesSession(session, caseRef);
};

module.exports = { setOrRemoveGetUpdatesSession };
