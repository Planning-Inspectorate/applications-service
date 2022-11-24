const { getDeadlineHasInterestedPartyNumber } = require('../../../session/deadline-session');
const {
	getSummaryListItemHasInterestedPartyNumber
} = require('./summary-list-item/has-interested-party-number');
const {
	getSummaryListItemInterestedPartyNumber
} = require('./summary-list-item/interested-party-number');

const getSummaryList = (session) => {
	const summaryList = [];
	const showPartyNumber = getDeadlineHasInterestedPartyNumber(session) === 'yes';

	summaryList.push(getSummaryListItemHasInterestedPartyNumber(session));
	if (showPartyNumber) summaryList.push(getSummaryListItemInterestedPartyNumber(session));

	return { summaryList };
};

module.exports = { getSummaryList };
