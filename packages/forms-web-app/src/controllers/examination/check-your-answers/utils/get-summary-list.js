const {
	getSummaryListItemHasInterestedPartyNumber
} = require('./summary-list-item/has-interested-party-number');
// const {
// 	getSummaryListItemInterestedPartyNumber
// } = require('./summary-list-item/interested-party-number');

const getSummaryList = (session) => {
	const summaryList = [];
	summaryList.push(getSummaryListItemHasInterestedPartyNumber(session));
	// summaryList.push(getSummaryListItemInterestedPartyNumber(session));

	return { summaryList };
};

module.exports = { getSummaryList };
