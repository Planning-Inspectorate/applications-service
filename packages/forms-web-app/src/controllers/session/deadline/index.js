const { getDeadlineCaseRef, setDeadlineCaseRef } = require('./case-ref');
const { getDeadlineId, setDeadlineId } = require('./id');
const {
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber
} = require('./has-interested-party-number');
const {
	getDeadlineInterestedPartyNumber,
	setDeadlineInterestedPartyNumber
} = require('./interested-party-number');
const { getDeadlineIsApplicant, setDeadlineIsApplicant } = require('./is-applicant');
const { getDeadlineTitle, setDeadlineTitle } = require('./title');
const { getDeadlineSubmittingFor, setDeadlineSubmittingFor } = require('./submitting-for');
const { getDeadlineName, setDeadlineName } = require('./name');
const { getDeadlineEmail, setDeadlineEmail } = require('./email');
const { getDeadlineItems, setDeadlineItems } = require('./items');

module.exports = {
	getDeadlineCaseRef,
	setDeadlineCaseRef,
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber,
	getDeadlineId,
	setDeadlineId,
	getDeadlineInterestedPartyNumber,
	setDeadlineInterestedPartyNumber,
	getDeadlineIsApplicant,
	setDeadlineIsApplicant,
	getDeadlineTitle,
	setDeadlineTitle,
	getDeadlineSubmittingFor,
	setDeadlineSubmittingFor,
	getDeadlineName,
	setDeadlineName,
	getDeadlineEmail,
	setDeadlineEmail,
	getDeadlineItems,
	setDeadlineItems
};
