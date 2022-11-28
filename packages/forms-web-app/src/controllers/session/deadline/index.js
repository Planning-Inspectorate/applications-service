const { getDeadlineCaseRef, setDeadlineCaseRef } = require('./case-ref');
const { getDeadlineId, setDeadlineId } = require('./id');
const {
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber
} = require('./details/has-interested-party-number');
const {
	getDeadlineInterestedPartyNumber,
	setDeadlineInterestedPartyNumber
} = require('./details/interested-party-number');
const { getDeadlineIsApplicant, setDeadlineIsApplicant } = require('./details/is-applicant');
const { getDeadlineTitle, setDeadlineTitle } = require('./title');
const { getDeadlineSubmittingFor, setDeadlineSubmittingFor } = require('./details/submitting-for');
const { getDeadlineName, setDeadlineName } = require('./details/name');
const { getDeadlineEmail, setDeadlineEmail } = require('./details/email');
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
