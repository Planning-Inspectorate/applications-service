const { getDeadlineCaseRef, setDeadlineCaseRef } = require('./deadline-case-ref');
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
	getDeadlineId,
	setDeadlineId,
	getDeadlineInterestedPartyNumber,
	setDeadlineInterestedPartyNumber,
	getDeadlineItems,
	setDeadlineItems,
	getDeadlineTitle,
	setDeadlineTitle
};
