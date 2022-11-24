const { getDeadlineCaseRef, setDeadlineCaseRef } = require('./deadline-case-ref');
const {
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber
} = require('./deadline-has-interested-party-number');
const { getDeadlineId, setDeadlineId } = require('./deadline-id');
const {
	getDeadlineInterestedPartyNumber,
	setDeadlineInterestedPartyNumber
} = require('./deadline-interested-party-number');
const { getDeadlineItems, setDeadlineItems } = require('./deadline-items');
const { getDeadlineTitle, setDeadlineTitle } = require('./deadline-title');

module.exports = {
	getDeadlineCaseRef,
	setDeadlineCaseRef,
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber,
	getDeadlineId,
	setDeadlineId,
	getDeadlineInterestedPartyNumber,
	setDeadlineInterestedPartyNumber,
	getDeadlineItems,
	setDeadlineItems,
	getDeadlineTitle,
	setDeadlineTitle
};
