const { getDeadlineCaseRef, setDeadlineCaseRef } = require('./case-ref');
const { getDeadlineId, setDeadlineId } = require('./id');
const { getDeadlineItems, setDeadlineItems } = require('./items');
const { getDeadlineTitle, setDeadlineTitle } = require('./title');
const { getDeadlineDetailsApplicant, setDeadlineDetailsApplicant } = require('./details/applicant');
const { getDeadlineDetailsEmail, setDeadlineDetailsEmail } = require('./details/email');
const {
	getDeadlineDetailsHasInterestedPartyNumber,
	setDeadlineDetailsHasInterestedPartyNumber
} = require('./details/has-interested-party-number');
const {
	getDeadlineDetailsInterestedPartyNumber,
	setDeadlineDetailsInterestedPartyNumber
} = require('./details/interested-party-number');
const { getDeadlineDetailsName, setDeadlineDetailsName } = require('./details/name');
const {
	getDeadlineDetailsSubmittingFor,
	setDeadlineDetailsSubmittingFor
} = require('./details/submitting-for');

module.exports = {
	getDeadlineCaseRef,
	setDeadlineCaseRef,
	getDeadlineId,
	setDeadlineId,
	getDeadlineItems,
	setDeadlineItems,
	getDeadlineTitle,
	setDeadlineTitle,
	getDeadlineDetailsApplicant,
	setDeadlineDetailsApplicant,
	getDeadlineDetailsEmail,
	setDeadlineDetailsEmail,
	getDeadlineDetailsHasInterestedPartyNumber,
	setDeadlineDetailsHasInterestedPartyNumber,
	getDeadlineDetailsInterestedPartyNumber,
	setDeadlineDetailsInterestedPartyNumber,
	getDeadlineDetailsSubmittingFor,
	setDeadlineDetailsSubmittingFor,
	getDeadlineDetailsName,
	setDeadlineDetailsName
};
